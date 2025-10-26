# Integrations

## HeyGen (API)
- Set `HEYGEN_API_KEY` in `.env.local`.
- Endpoint: `/api/heygen-photo` uploads the photo, creates a photo avatar group, adds motion, polls status, then returns `motion_preview_url`.
- Client re-encodes the result with an **SVG watermark** so the downloaded file always contains your logo.

## Sora
- As of now, Sora 2 is available in the app/web; the public API is not yet generally available.
- Workflow: create a clip in Sora → drop the MP4 here → we re-encode with your **SVG** logo.

## Remini
- Use the Remini app to pre-enhance images before animation. Remini’s official API was **discontinued** in 2025.
