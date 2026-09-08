export async function GET() {
  return new Response("Legacy video proxy is disabled. Playback uses the documented CineSrc embed API.", {
    status: 410,
    headers: { "Cache-Control": "no-store" },
  });
}
