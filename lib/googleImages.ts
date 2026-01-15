import { GoogleImageSearchResponse } from "@/types";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID!;

async function fetchWithTimeout(
  resource: string,
  timeout = 3000
): Promise<Response | null> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(resource, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch {
    clearTimeout(id);
    return null;
  }
}

export async function fetchPanoramicImage(
  query: string
): Promise<string | null> {
  const params = new URLSearchParams({
    q: query,
    searchType: "image",
    imgType: "photo",
    key: GOOGLE_API_KEY,
    cx: GOOGLE_CSE_ID,
  });

  const url = `https://www.googleapis.com/customsearch/v1?${params}`;
  const res = await fetchWithTimeout(url);

  if (!res || !res.ok) return null;

  const data: GoogleImageSearchResponse = await res.json();
  if (!data.items?.length) return null;

  const panoramic = data.items.find(
    (img) => img.image?.width / img.image?.height >= 2.5
  );

  return panoramic?.link ?? data.items[0].link ?? null;
}
