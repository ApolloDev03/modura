import type { Metadata } from "next";
import { getPageSeo, buildPageMetadata, extractJsonLd } from "@/lib/pageSeo";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("services");
  return buildPageMetadata(seo, "services");
}

export default async function ServicesPage() {
  const seo = await getPageSeo("services");
  const schemas = extractJsonLd(seo);
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`services-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\u003c"),
          }}
        />
      ))}
      <ServicesClient />
    </>
  );
}
