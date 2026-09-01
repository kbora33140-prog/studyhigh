import { readFile } from "node:fs/promises";
import path from "node:path";
import { getValidatedTestSeoImage } from "@/lib/testSeoManifest";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  const record = getValidatedTestSeoImage(filename);
  if (!record) return new Response("Not found", { status: 404 });
  const image = await readFile(
    path.join(process.cwd(), "public", "seo-images", "stable-existing", filename),
  );

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(image.byteLength),
    },
  });
}
