'use client';

import { useState, useEffect, useMemo } from "react";
import { Destination } from "../types";

const imageCache = new Map<string, string[]>();

export function useDestinationImages(destination: Destination, isOpen: boolean) {
  const baseImage = destination.images?.[0] ?? "";

  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const highlightsKey = useMemo(() => (destination.highlights || []).join(","), [destination.highlights]);
  const cacheKey = useMemo(() => `${destination.name}|${highlightsKey}`, [destination.name, highlightsKey]);

  useEffect(() => {
    if (!isOpen || !baseImage || extraImages.length > 0 || loadingImages) return;

    (async () => {
      setLoadingImages(true);

      try {
        if (imageCache.has(cacheKey)) {
          setExtraImages(imageCache.get(cacheKey)!);
          return;
        }

        const res = await fetch("/api/destination-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: destination.name,
            highlights: destination.highlights || [],
          }),
        });

        if (!res.ok) throw new Error("Błąd pobierania zdjęć");

        const data = await res.json() as { images: string[] };
        const filtered = (data.images || []).filter(img => img !== baseImage);

        imageCache.set(cacheKey, filtered);
        setExtraImages(filtered);

        [baseImage, ...filtered].forEach(src => {
          const img = new window.Image();
          img.src = src;
        });

      } catch (e) {
        console.error("Failed to fetch destination images:", e);
      } finally {
        setLoadingImages(false);
      }
    })();
  }, [isOpen, cacheKey, baseImage, extraImages.length, loadingImages]);

  useEffect(() => {
    if (!isOpen) {
      setExtraImages([]);
      setLoadingImages(false);
    }
  }, [isOpen]);

  const images = useMemo(() => (baseImage ? [baseImage, ...extraImages] : extraImages), [baseImage, extraImages]);

  return { images, loadingImages };
}
