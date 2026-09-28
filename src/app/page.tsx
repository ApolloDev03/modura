import Image from "next/image";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Footer />
    </>
  );
}
