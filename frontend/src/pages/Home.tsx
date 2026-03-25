import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import About from "../components/sections/About";
import Stats from "../components/sections/Stats";
import CTA from "../components/sections/CTA";
import Contact from "../components/sections/Contact";
import "../styles/pages/home.css";

function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Stats />
      <CTA />
      <Contact />
    </>
  );
}

export default Home;
