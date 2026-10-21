import type { Metadata } from "next";
import CompanyClient from "./CompanyClient";

import {
  getPageSeo,
  buildPageMetadata,
  extractJsonLd,
} from "@/lib/pageSeo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("company");

  return buildPageMetadata(seo, "company");
}

export default async function CompanyPage() {
  const seo = await getPageSeo("company");

  const jsonLd = extractJsonLd(seo);

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      ))}

      <CompanyClient />
    </>
  );
}