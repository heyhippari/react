import { FormMovieEdit } from '@/components/form-movie-edit';
import { movieService } from '@/services/movie.service';
import { userService } from '@/services/user.service';
import { redirect } from 'next/navigation';

/**
 * Server-side code for the movie edit page.
 * @param properties The properties for the movie edit page.
 * @param properties.params The URL parameters, containing the movie ID.
 * @returns The rendered component.
 */
export default async function MovieEditPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  // If we are not logged in, redirect to login
  const isLoggedIn = await userService.refreshUser();
  if (!isLoggedIn) {
    redirect('/login');
  }

  // If the id contains anything other than numbers, redirect to 404
  if (!/^\d+$/.test(id)) {
    return redirect('/404');
  }

  const movie = await movieService.getMovie(Number(id));

  return <FormMovieEdit movie={movie} />;
}
