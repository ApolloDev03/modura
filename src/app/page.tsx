import Image from "next/image";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/footer";
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
      <TopBar />
      <Header />
      <Hero />
      <About />
      <Services/>
      <Projects/>
      <Counter/>
      <Testimonials/>
      <Industries />
      <ClientLogos />
      <BlogSection/>
      <Footer />
    </>
  );
}
