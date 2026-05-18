import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { BrandGrid } from '../components/home/BrandGrid';
import { WhyUs } from '../components/home/WhyUs';
import { Guide } from '../components/home/Guide';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrandGrid />
        <WhyUs />
        <Guide />
      </main>
      <Footer />
    </>
  );
}
