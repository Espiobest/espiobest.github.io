import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Research from './components/sections/Research';
import Writing from './components/sections/Writing';
import Contact from './components/sections/Contact';
import Quote from './components/sections/Quote';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Quote
        text="Programs must be written for people to read, and only incidentally for machines to execute."
        author="Harold Abelson, SICP"
      />
      <Experience />
      <Projects />
      <Quote
        text="The purpose of computing is insight, not numbers."
        author="Richard Hamming"
      />
      <Research />
      <Writing />
      <Contact />
    </>
  );
}
