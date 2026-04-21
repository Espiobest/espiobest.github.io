import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Research from './components/sections/Research';
import Writing from './components/sections/Writing';
import Contact from './components/sections/Contact';
import Quote from './components/sections/Quote';
import FadeInSection from './components/FadeInSection';

export default function Home() {
  return (
    <>
      <Hero />
      <FadeInSection><About /></FadeInSection>
      <FadeInSection>
        <Quote
          text="Programs must be written for people to read, and only incidentally for machines to execute."
          author="Harold Abelson, SICP"
        />
      </FadeInSection>
      <FadeInSection><Experience /></FadeInSection>
      <FadeInSection><Projects /></FadeInSection>
      <FadeInSection>
        <Quote
          text="The purpose of computing is insight, not numbers."
          author="Richard Hamming"
        />
      </FadeInSection>
      <FadeInSection><Research /></FadeInSection>
      <FadeInSection><Writing /></FadeInSection>
      <FadeInSection><Contact /></FadeInSection>
    </>
  );
}
