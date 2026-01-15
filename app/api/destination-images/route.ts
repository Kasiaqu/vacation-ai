import { NextRequest } from "next/server";
import { fetchPanoramicImage } from "@/lib/googleImages";

export async function POST(req: NextRequest) {
  try {
    const { name, highlights } = await req.json();

    if (!name || !Array.isArray(highlights) || highlights.length < 2) {
      return Response.json({ images: [] });
    }

    const queries = highlights
      .slice(1, 3)
      .map((h: string) => `${name} ${h}`);

    const images = (
      await Promise.all(queries.map(fetchPanoramicImage))
    ).filter(Boolean);

    return Response.json({ images });
  } catch {
    return Response.json({ images: [] }, { status: 500 });
  }
}
