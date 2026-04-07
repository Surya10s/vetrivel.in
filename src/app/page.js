import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Fleet from "./components/Fleet";
import ReasonBlock from "./components/ReasonBlock";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Fleet />
      {/* <Stats /> */}
      <WhyUs />
      <Contact />
      <Footer /></>
  );
}
