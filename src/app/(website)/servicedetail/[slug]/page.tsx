import type { Metadata } from "next";
import { fetchDetailSeo, detailMetadata, detailSchemas } from "@/lib/detailSeo";
import ServiceDetailClient from "./ServiceDetailClient";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function seoData(slug: string) {
  return fetchDetailSeo("serviceDetail", { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await seoData(slug);
  return detailMetadata(item, slug, "servicedetail", "Service Detail", "website");
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
      <ServiceDetailClient />
    </>
  );
}
