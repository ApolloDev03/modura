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

export default async function Home() {
  let data;

  try {
    const response = await api.post(`${apiUrl}/home`, {});

    data = response.data.data;
  } catch (error) {
    console.error("Home API Error:", error);

    return (
      <div>
        Unable to load homepage data.
      </div>
    );
  }

  return (
    <>
      <Hero />

      <Services
        services={data.services}
      />

      <About />

      <Projects
        portfolios={data.portfolios}
      />

      <Counter counter={data.counter}/>

      <Testimonials
        testimonials={data.testimonials}
      />

     <Industries software={data.software} />

      <ClientLogos
        clients={data.clients}
      />

      <BlogSection
        blogs={data.blogs}
      />
    </>
  );
}