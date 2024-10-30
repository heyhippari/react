import { viewsService } from '@/services/views.service';

/**
 * Block of statistics for the home page hero.
 * @returns The home stats component.
 */
export default async function HomeStats() {
  const counts = await viewsService.getCurrentCounts();

  return (
    <div className="container z-20 flex flex-row items-center justify-center gap-8 px-4 text-center">
      <div className="grid grid-cols-1 gap-8 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex flex-col items-center justify-center before:absolute before:bg-pink-300 before:content-[''] before:bs-screen before:is-px before:-inset-block-4 before:-inset-inline-4 after:absolute after:z-10 after:bg-pink-300 after:content-[''] after:bs-px after:is-screen after:-block-start-4 after:inline-start-0 before:dark:bg-pink-500 after:dark:bg-pink-500">
          <h2 className="text-2xl font-bold">Movies</h2>
          <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
            {counts?.movie_count}
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center before:absolute before:bg-pink-300 before:content-[''] before:bs-screen before:is-px before:-inset-block-4 before:-inset-inline-4 after:absolute after:z-10 after:bg-pink-300 after:content-[''] after:bs-px after:is-screen after:-block-start-4 after:inline-start-0 before:dark:bg-pink-500 after:dark:bg-pink-500">
          <h2 className="text-2xl font-bold">People</h2>
          <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
            {counts?.person_count}
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center before:absolute before:bg-pink-300 before:content-[''] before:bs-screen before:is-px before:-inset-block-4 before:-inset-inline-4 after:absolute after:z-10 after:bg-pink-300 after:content-[''] after:bs-px after:is-screen after:-block-start-4 after:inline-start-0 before:dark:bg-pink-500 after:dark:bg-pink-500">
          <h2 className="text-2xl font-bold">Studios</h2>
          <p className="w-fit bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
            {counts?.studio_count}
          </p>
        </div>
      </div>
    </div>
  );
}
