import type { Metadata } from "next";
import { fetchDetailSeo, detailMetadata, detailSchemas } from "@/lib/detailSeo";
import SoftwareExpertiseClient from "./SoftwareExpertiseClient";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function seoData(slug: string) {
  return fetchDetailSeo("softwareDetail", { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await seoData(slug);
  return detailMetadata(item, slug, "softwareexpertise", "Software Expertise", "website");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = await seoData(slug);
  const schemas = detailSchemas(item);
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`detail-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <SoftwareExpertiseClient />
    </>
  );
}
