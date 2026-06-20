import { useEffect } from 'react';
import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { Connect } from '../components/sections/Connect';

export function Home() {
  useEffect(() => {
    document.title = 'Hrushi Bhatt — Computer Engineer';
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
