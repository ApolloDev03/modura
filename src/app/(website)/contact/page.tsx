import type { Metadata } from "next";
import {
  getPageSeo,
  buildPageMetadata,
  extractJsonLd,
} from "@/lib/pageSeo";
import ContactClient from "./ContactClient";

// Fetch the latest admin-managed metadata for each server request.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("contact-us");
  return buildPageMetadata(seo, "contact-us");
}

export default async function ContactPage() {
  const seo = await getPageSeo("contact-us");
  const schemas = extractJsonLd(seo);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`contact-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <ContactClient />
    </>
  );
}