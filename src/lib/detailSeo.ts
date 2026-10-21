import "server-only";
import type { Metadata } from "next";
import { extractJsonLd } from "@/lib/pageSeo";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://admin.mvnlengineering.in/api/v1").replace(/\/+$/, "");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mvnlengineering.in").replace(/\/+$/, "");

export type DetailSeo = {
  title?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeyword?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  coverImage?: string | null;
  coverImageUrl?: string | null;
  headScript?: string | null;
  bodyScript?: string | null;
  category?: { name?: string | null; metaTitle?: string | null; metaDescription?: string | null; metaKeyword?: string | null; headScript?: string | null; bodyScript?: string | null } | null;
  publishedAt?: string | null;
  author?: string | null;
};

type ApiPayload = { success?: boolean; data?: DetailSeo | { items?: DetailSeo[]; category?: DetailSeo } };

export async function fetchDetailSeo(endpoint: string, payload: Record<string, unknown>): Promise<DetailSeo | null> {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const result = (await response.json()) as ApiPayload;
    if (!result.success || !result.data) return null;
    if ("items" in result.data) {
      const collection = result.data;
      return collection.category || collection.items?.[0]?.category || null;
    }
    return result.data as DetailSeo;
  } catch (error) {
    console.error(`Detail SEO API error (${endpoint}):`, error);
    return null;
  }
}

function textOnly(input?: string | null): string {
  return (input || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ").trim();
}

function assetUrl(input?: string | null): string | undefined {
  if (!input) return undefined;
  try {
    const result = new URL(input, `${new URL(API_BASE).origin}/`).toString();
    return /^https?:\/\//i.test(result) ? result : undefined;
  } catch { return undefined; }
}

export function detailMetadata(item: DetailSeo | null, slug: string, prefix: string, fallbackLabel: string, kind: "article" | "website" = "website"): Metadata {
  const name = textOnly(item?.title || item?.name) || slug.split("-").filter(Boolean).join(" ") || fallbackLabel;
  const title = textOnly(item?.metaTitle) || `${name} | MVNL Engineering`;
  const description = (textOnly(item?.metaDescription) || textOnly(item?.shortDescription || item?.description || item?.longDescription) || `${name} - MVNL Engineering`).slice(0, 200);
  const keywords = textOnly(item?.metaKeyword).split(",").map(x => x.trim()).filter(Boolean);
  const canonical = `${SITE_URL}/${prefix}/${encodeURIComponent(slug)}`;
  const img = assetUrl(item?.imageUrl || item?.coverImageUrl || item?.image || item?.coverImage);
  return {
    title: { absolute: title },
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical },
    openGraph: { type: kind, title, description, url: canonical, siteName: "MVNL Engineering", ...(img ? { images: [img] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(img ? { images: [img] } : {}) },
  };
}

export function detailSchemas(item: DetailSeo | null): Record<string, unknown>[] {
  return extractJsonLd(item ? { pageKey: "detail", headScript: item.headScript, bodyScript: item.bodyScript } : null);
}
