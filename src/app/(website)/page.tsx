// import Hero from "../../components/Hero";
// import About from "../../components/About";
// import Services from "../../components/Services";
// import Projects from "../../components/Projects";
// import Counter from "../../components/Counter";
// import Testimonials from "../../components/Testimonials";
// import ClientLogos from "../../components/ClientLogos";
// import Industries from "../../components/Industries";
// import BlogSection from "../../components/BlogSection";

// import api from "@/lib/api";
// import { apiUrl } from "./config";

// export default async function Home() {
//   let data;

//   try {
//     const response = await api.post(`${apiUrl}/home`, {});

//     data = response.data.data;
//   } catch (error) {
//     console.error("Home API Error:", error);

//     return (
//       <div>
//         Unable to load homepage data.
//       </div>
//     );
//   }

//   return (
//     <>
//       <Hero />

//       <Services
//         services={data.services}
//       />

//       <About />

//       <Projects
//         portfolios={data.portfolios}
//       />

//       <Counter counter={data.counter}/>

//       <Testimonials
//         testimonials={data.testimonials}
//       />

//      <Industries  />

//       <ClientLogos
//         clients={data.clients}
//       />

//       <BlogSection
//         blogs={data.blogs}
//       />
//     </>
//   );
// }



import type { Metadata } from "next";

import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import Projects from "../../components/Projects";
import Counter from "../../components/Counter";
import Testimonials from "../../components/Testimonials";
import ClientLogos from "../../components/ClientLogos";
import Industries from "../../components/Industries";
import BlogSection from "../../components/BlogSection";

import api from "@/lib/api";
import { apiUrl } from "./config";
import { buildPageMetadata, extractJsonLd, getPageSeo } from "@/components/pageSeo";


// Always generate fresh server HTML and metadata.
export const dynamic = "force-dynamic";

// HOME SEO
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");

  return buildPageMetadata(seo, "home");
}

// HOME PAGE
export default async function Home() {
  const [homeResult, seo] = await Promise.allSettled([
    api.post(`${apiUrl}/home`, {}),
    getPageSeo("home"),
  ]);

  if (homeResult.status === "rejected") {
    console.error("Home API Error:", homeResult.reason);

    return (
      <div className="px-5 py-20 text-center">
        Unable to load homepage data.
      </div>
    );
  }

  const data = homeResult.value.data?.data;

  if (!data) {
    return (
      <div className="px-5 py-20 text-center">
        Unable to load homepage data.
      </div>
    );
  }

  const seoData =
    seo.status === "fulfilled" ? seo.value : null;

  const jsonLd = extractJsonLd(seoData);

  return (
    <>
      {/* SERVER-RENDERED STRUCTURED DATA */}
      {jsonLd.map((schema, index) => (
        <script
          key={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      ))}

      <Hero />

      <Services services={data.services || []} />

      <About />

      <Projects portfolios={data.portfolios || []} />

      <Counter counter={data.counter} />

      <Testimonials
        testimonials={data.testimonials || []}
      />

      <Industries />

      <ClientLogos clients={data.clients || []} />

      <BlogSection blogs={data.blogs || []} />
    </>
  );
}
