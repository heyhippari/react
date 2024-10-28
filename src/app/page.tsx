import HomeSliders from '@/components/home-sliders';
import HomeStats from '@/components/home-stats';

/**
 * The home page.
 * @returns The home page.
 */
export default function Home() {
  return (
    <>
      <div className="flex h-fit w-full flex-col items-center justify-center bg-pink-100 py-4 dark:bg-pink-800 md:h-80 md:py-0 lg:h-72">
        <HomeStats />
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <HomeSliders />
      </div>
    </>
  );
}
