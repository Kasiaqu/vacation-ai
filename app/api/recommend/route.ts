import { Destination } from "@/types";
import { NextRequest } from "next/server";
import { fetchPanoramicImage } from "@/lib/googleImages";

const OPENAI_KEY = process.env.OPENAI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { preferences } = await req.json();

    const systemPrompt = `
You are a helpful travel recommender.

Based on the provided user preferences, propose up to 3 travel destinations
that BEST MATCH those preferences.

The preferences describe:
- desired vacation types
- climate and activities
- approximate flight time range (as a guideline, not an exact calculation)

Use your general knowledge and common sense to suggest destinations
that are reasonably consistent with the preferences.

Do NOT invent or calculate exact distances or flight times.
Do NOT include destinations that are clearly unrealistic for the given preferences.

Return ONLY valid JSON using the following schema:
{
  "recommendations": [
    {
      "id": "...",
      "name": "...",
      "country": "...",
      "continent": "...",
      "vacationType": [],
      "description": "...",
      "temperature": "...",
      "bestMonths": [],
      "budget": "budget|moderate|luxury",
      "activities": [],
      "highlights": [],
      "travelTip": "...",
      "coordinates": { "lat": 0, "lng": 0 },
      "reason": "...",
      "flightDuration": 0
    }
  ]
}
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(preferences) },
        ],
      }),
    });

    const json = await openaiRes.json();
    const text = json?.choices?.[0]?.message?.content;
    if (!text) return Response.json({ recommendations: [] });

    const parsed = JSON.parse(text) as { recommendations: Destination[] };

    const enriched = await Promise.all(
      parsed.recommendations.map(async (d) => {
        const hero =
          d.highlights?.[0]
            ? await fetchPanoramicImage(`${d.name} ${d.highlights[0]}`)
            : null;

        return {
          ...d,
          images: hero ? [hero] : [],
        };
      })
    );

    return Response.json({ recommendations: enriched, source: "ai" });
  } catch {
    return Response.json({ recommendations: [] }, { status: 500 });
  }
}
