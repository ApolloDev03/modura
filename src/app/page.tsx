import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Counter from "./components/Counter";
import Testimonials from "./components/Testimonials";
import ClientLogos from "./components/ClientLogos";
import Industries from "./components/Industries";
import BlogSection from "./components/BlogSection";

export default function Home() {
  return (
    <>
     
      <Hero />
      <Services/>
      <About />
      <Projects/>
      <Counter/>
      <Testimonials/>
      <Industries />
      <ClientLogos />
      <BlogSection/>
    
    </>
  );
}
