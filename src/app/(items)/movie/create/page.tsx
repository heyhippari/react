import { FormMovieCreate } from '@/components/form-movie-create';
import { userService } from '@/services/user.service';
import { redirect } from 'next/navigation';

/**
 * Server-side code for the movie create page.
 * @returns The rendered component.
 */
export default async function MovieEditPage() {
  // If we are not logged in, redirect to login
  const isLoggedIn = await userService.refreshUser();
  if (!isLoggedIn) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4 border-b-2 border-pink-300 bg-pink-100 py-4 dark:border-pink-700 dark:bg-pink-800">
        <div className="container flex flex-col gap-6 px-4 md:flex-row">
          <h1 className="line-clamp-2 w-fit text-ellipsis bg-gradient-to-r from-pink-600 to-rose-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-pink-400 dark:to-rose-400">
            Add a Movie
          </h1>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <FormMovieCreate />
      </div>
    </>
  );
}
