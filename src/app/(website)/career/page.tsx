import type { Metadata } from "next";
import { getPageSeo, buildPageMetadata, extractJsonLd } from "@/lib/pageSeo";
import CareerClient from "./CareerClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("career");
  return buildPageMetadata(seo, "career");
}

export default async function CareerPage() {
  const seo = await getPageSeo("career");
  const schemas = extractJsonLd(seo);
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`career-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\u003c"),
          }}
        />
      ))}
      <CareerClient />
    </>
  );
}
