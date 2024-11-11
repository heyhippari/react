import ChartMoviesPerYear from '@/components/chart-movies-per-year';
import ChartRolesByAge from '@/components/chart-roles-by-age';
import { viewsService } from '@/services/views.service';

/**
 * Statistics page.
 * @returns The page content.
 */
export default async function StatsPage() {
  const moviesPerYear = await viewsService.getMoviesPerYear();
  const rolesByAge = await viewsService.getRolesByAge();

  return (
    <>
      <div className="flex w-full flex-col gap-4 border-b-2 border-pink-300 bg-pink-100 py-4 dark:border-pink-700 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
            Statistics
          </h1>
        </div>
      </div>
      <div className="container grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Movies per Year</h2>
          {moviesPerYear ? <ChartMoviesPerYear data={moviesPerYear} /> : null}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Roles by Age</h2>
          {rolesByAge ? <ChartRolesByAge data={rolesByAge} /> : null}
        </div>
      </div>
    </>
  );
}
