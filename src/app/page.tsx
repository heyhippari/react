import HomeSliders from '@/components/home-sliders';
import Image from 'next/image';

/**
 * The home page.
 * @returns The home page.
 */
export default function Home() {
  // Generate a random number between 1 and 3.
  const randomHero = Math.floor(Math.random() * 3) + 1;

  return (
    <>
      <div className="relative flex h-52 w-full flex-col items-center justify-center py-4 text-white sm:h-64 md:h-80 md:py-0 lg:h-96">
        <Image
          alt="Hero"
          className="container z-0 object-cover p-0"
          fill
          src={`/hero/hero-${randomHero}-desktop.png`}
        />
        <div className="container pointer-events-none absolute inset-0 bg-pink-200/60 p-0 bg-blend-overlay dark:bg-pink-900/70" />
        <h1 className="container z-10 text-center text-3xl font-black text-white md:text-5xl">
          Find your new favorite idol
        </h1>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <HomeSliders />
      </div>
    </>
  );
}
