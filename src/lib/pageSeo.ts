
import "server-only";
import type { Metadata } from "next";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://admin.mvnlengineering.in/api/v1"
).replace(/\/+$/, "");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://admin.mvnlengineering.in"
).replace(/\/+$/, "");

export type SeoPageKey =
  | "home"
  | "company"
  | "contact-us"
  | "services"
  | "software-expertise"
  | "portfolio"
  | "career"
  | "blog";

type SeoData = {
  id?: number;
  pageKey: string;
  pageName?: string;
  metaTitle?: string | null;
  metaKeyword?: string | null;
  metaDescription?: string | null;
  headScript?: string | null;
  bodyScript?: string | null;
};

type SeoResponse = {
  success: boolean;
  message?: string;
  data?: SeoData;
};

const PAGE_PATHS: Record<SeoPageKey, string> = {
  home: "/",
  "company": "/company",
  "contact-us": "/contact",
  services: "/services",
  "software-expertise": "/softwareexpertise",
  portfolio: "/portfolio",
  career: "/career",
  blog: "/blog",
};

const FALLBACK_TITLE =
  "MVNL Engineering | Architecture & Engineering Services";

function plainText(html?: string | null): string {
  return (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttribute(tag: string, name: string): string {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(?:^|\\s)${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i"
  );

  const match = tag.match(pattern);
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? "";
}

function getMetaContent(
  html: string,
  attribute: "name" | "property",
  key: string
): string {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];

  for (const tag of tags) {
    if (
      getAttribute(tag, attribute).toLowerCase() ===
      key.toLowerCase()
    ) {
      return getAttribute(tag, "content");
    }
  }

  return "";
}

function getCanonical(html: string): string {
  const links = html.match(/<link\b[^>]*>/gi) || [];

  for (const tag of links) {
    if (
      getAttribute(tag, "rel").toLowerCase() === "canonical"
    ) {
      return getAttribute(tag, "href");
    }
  }

  return "";
}

function absoluteUrl(url: string): string {
  try {
    return new URL(url, SITE_URL).toString();
  } catch {
    return "";
  }
}

function validImageUrl(url: string): string | undefined {
  if (!url || url.includes("YOUR_ACTUAL_IMAGE_URL")) {
    return undefined;
  }

  const resolved = absoluteUrl(url);

  return /^https?:\/\//i.test(resolved)
    ? resolved
    : undefined;
}

export async function getPageSeo(
  pageKey: SeoPageKey
): Promise<SeoData | null> {
  try {
    const response = await fetch(`${API_BASE}/seopageKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ pageKey }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`SEO API HTTP ${response.status}`);
    }

    const result = (await response.json()) as SeoResponse;

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(`SEO API error (${pageKey}):`, error);
    return null;
  }
}

export function buildPageMetadata(
  seo: SeoData | null,
  pageKey: SeoPageKey
): Metadata {
  const head = seo?.headScript || "";

  const title =
    seo?.metaTitle?.trim() ||
    FALLBACK_TITLE;

  const description =
    plainText(seo?.metaDescription) ||
    "Professional architectural and engineering services.";

  const keywords = seo?.metaKeyword
    ? plainText(seo.metaKeyword)
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : undefined;

  const canonical = absoluteUrl(
    getCanonical(head) || PAGE_PATHS[pageKey]
  );

  const ogImage = validImageUrl(
    getMetaContent(head, "property", "og:image")
  );

  const twitterImage = validImageUrl(
    getMetaContent(head, "name", "twitter:image")
  );

  const ogType =
    getMetaContent(head, "property", "og:type") === "article"
      ? "article"
      : "website";

  const ogTitle =
    getMetaContent(head, "property", "og:title") || title;

  const ogDescription =
    getMetaContent(head, "property", "og:description") ||
    description;

  const ogUrl = absoluteUrl(
    getMetaContent(head, "property", "og:url") ||
      canonical
  );

  const twitterCard =
    getMetaContent(head, "name", "twitter:card") === "summary"
      ? "summary"
      : "summary_large_image";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: ogType,
      url: ogUrl,
      title: ogTitle,
      description: ogDescription,
      siteName: "MVNL Engineering",
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: twitterCard,
      title:
        getMetaContent(head, "name", "twitter:title") ||
        title,
      description:
        getMetaContent(head, "name", "twitter:description") ||
        description,
      ...(twitterImage || ogImage
        ? { images: [twitterImage || ogImage!] }
        : {}),
    },
  };
}

export function extractJsonLd(
  seo: SeoData | null
): Record<string, unknown>[] {
  const html = [
    seo?.headScript || "",
    seo?.bodyScript || "",
  ].join("\n");

  const results: Record<string, unknown>[] = [];

  const regex =
    /<script\b(?=[^>]*\btype\s*=\s*["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(regex)) {
    try {
      const json: unknown = JSON.parse(match[1].trim());

      if (
        json &&
        typeof json === "object" &&
        !Array.isArray(json)
      ) {
        results.push(json as Record<string, unknown>);
      } else if (Array.isArray(json)) {
        for (const item of json) {
          if (
            item &&
            typeof item === "object" &&
            !Array.isArray(item)
          ) {
            results.push(item as Record<string, unknown>);
          }
        }
      }
    } catch {
      console.warn("Invalid JSON-LD received from SEO API.");
    }
  }

  return results;
}
