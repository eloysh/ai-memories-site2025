export const dynamic = 'force-dynamic';
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return new Response(JSON.stringify({error: 'no_file'}), {status: 400});

    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({error: 'no_api_key'}), {status: 500});

    // 1) Upload asset
    const fileBuf = Buffer.from(await file.arrayBuffer());
    const upRes = await fetch('https://upload.heygen.com/v1/asset', {
      method: 'POST',
      headers: {'X-Api-Key': apiKey, 'Content-Type': file.type || 'image/jpeg'},
      body: fileBuf
    });
    const upJson = await upRes.json();
    if (!upRes.ok) return new Response(JSON.stringify({error: 'upload_failed', detail: upJson}), {status: 502});
    const image_key = upJson?.data?.image_key || upJson?.data?.meta?.image_key;
    if (!image_key) return new Response(JSON.stringify({error: 'no_image_key', detail: upJson}), {status: 502});

    // 2) Create photo avatar group from that image
    const groupRes = await fetch('https://api.heygen.com/v2/photo_avatar/avatar_group/create', {
      method: 'POST',
      headers: {'X-Api-Key': apiKey, 'Content-Type': 'application/json'},
      body: JSON.stringify({ name: 'client-upload', image_key })
    });
    const groupJson = await groupRes.json();
    if (!groupRes.ok) return new Response(JSON.stringify({error: 'group_create_failed', detail: groupJson}), {status: 502});
    const group_id = groupJson?.data?.group_id || groupJson?.data?.id;
    if (!group_id) return new Response(JSON.stringify({error: 'no_group_id', detail: groupJson}), {status: 502});

    // 3) List avatars (looks) in the group to get the first look id
    const looksRes = await fetch(`https://api.heygen.com/v2/avatar_group/${group_id}/avatars`, {
      headers: {'X-Api-Key': apiKey}
    });
    const looksJson = await looksRes.json();
    if (!looksRes.ok) return new Response(JSON.stringify({error: 'list_avatars_failed', detail: looksJson}), {status: 502});
    const lookId = looksJson?.data?.avatar_list?.[0]?.id;
    if (!lookId) return new Response(JSON.stringify({error: 'no_look_id', detail: looksJson}), {status: 502});

    // 4) Add motion to the photo avatar (turn into a moving preview)
    const motionRes = await fetch('https://api.heygen.com/v2/photo_avatar/add_motion', {
      method: 'POST',
      headers: {'X-Api-Key': apiKey, 'Content-Type': 'application/json'},
      body: JSON.stringify({ id: lookId })
    });
    const motionJson = await motionRes.json();
    if (!motionRes.ok) return new Response(JSON.stringify({error: 'add_motion_failed', detail: motionJson}), {status: 502});

    const motionId = motionJson?.data?.id || lookId;

    // 5) Poll status until completed (simple tries)
    let motionPreview = null;
    for (let i=0;i<15;i++){
      const st = await fetch(`https://api.heygen.com/v2/photo_avatar/${motionId}`, { headers: {'X-Api-Key': apiKey} });
      const js = await st.json();
      if (js?.data?.motion_preview_url) { motionPreview = js.data.motion_preview_url; break; }
      await new Promise(r=>setTimeout(r, 2000));
    }
    if (!motionPreview) return new Response(JSON.stringify({error: 'motion_timeout'}), {status: 504});

    // Optional: Return raw preview URL; client will watermark with SVG
    return new Response(JSON.stringify({ videoUrl: motionPreview }), {status: 200, headers: {'Content-Type': 'application/json'}});
  } catch (e) {
    return new Response(JSON.stringify({error: 'server_error', detail: String(e)}), {status: 500});
  }
}
