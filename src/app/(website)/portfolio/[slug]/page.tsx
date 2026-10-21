import type { Metadata } from "next";
import { fetchDetailSeo, detailMetadata, detailSchemas } from "@/lib/detailSeo";
import PortfolioClient from "./PortfolioClient";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function seoData(slug: string) {
  return fetchDetailSeo("portfolios", { category: slug, type: "3d", page: 1, limit: 12 });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await seoData(slug);
  return detailMetadata(item, slug, "portfolio", "Portfolio", "website");
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
      <PortfolioClient />
    </>
  );
}
