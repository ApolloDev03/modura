import type { Metadata } from "next";
import { getPageSeo, buildPageMetadata, extractJsonLd } from "@/lib/pageSeo";
import BlogClient from "./BlogClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blog");
  return buildPageMetadata(seo, "blog");
}

export default async function BlogPage() {
  const seo = await getPageSeo("blog");
  const schemas = extractJsonLd(seo);
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`blog-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\u003c"),
          }}
        />
      ))}
      <BlogClient />
    </>
  );
}
