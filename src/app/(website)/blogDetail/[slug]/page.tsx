import type { Metadata } from "next";
import { fetchDetailSeo, detailMetadata, detailSchemas } from "@/lib/detailSeo";
import BlogClient from "./BlogClient";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function seoData(slug: string) {
  return fetchDetailSeo("blogDetail", { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await seoData(slug);
  return detailMetadata(item, slug, "blogDetail", "Blog", "article");
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
      <BlogClient />
    </>
  );
}
