export const dynamic = 'force-dynamic';
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    if (!url) return new Response('Missing url', {status: 400});
    const r = await fetch(url);
    const headers = new Headers(r.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    return new Response(r.body, { status: r.status, headers });
  } catch (e) {
    return new Response('Proxy error', {status: 500});
  }
}
