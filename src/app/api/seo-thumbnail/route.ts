import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  const image = await readFile(
    path.join(process.cwd(), "public", "thumbnails", "studyhigh-official-template.png"),
  );

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.byteLength),
    },
  });
}
