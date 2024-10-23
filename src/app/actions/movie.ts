'use server';
import { getMovieById } from '@/queries/get-movie-by-id';
import { cloudflare } from '@/utils/cloudflare';
import createClient from '@/utils/supabase/server';
import { MovieEditFormSchema, MovieRoleAddFormSchema } from '@/utils/validation/movie-update';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteMovieRoleAction(movieId: number, role_id: number) {
  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

  if (!movieId) {
    throw new Error('No movie ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: movie, error } = await getMovieById(supabase, movieId);

  if (error || !movie) {
    throw new Error('Error fetching movie');
  }

  console.log('movie_id', movieId);
  console.log('role_id', role_id);

  const { error: deleteError } = await supabase
    .from('roles')
    .delete()
    .eq('id', role_id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error('Error deleting role');
  }

  // Revalidate the movie page in case the roles were updated
  revalidatePath(`/movie/${movieId}`, 'page');
  revalidatePath(`/movie/${movieId}/edit/cast`, 'page');
  redirect(`/movie/${movieId}/edit/cast`);
}

export async function addMovieRoleAction(
  movieId: number,
  formData: MovieRoleAddFormSchema,
) {
  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

  if (!movieId) {
    throw new Error('No movie ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: movie, error } = await getMovieById(supabase, movieId);

  if (error || !movie) {
    throw new Error('Error fetching movie');
  }

  const { error: insertError } = await supabase
    .from('roles')
    .insert({
      movie_id: movieId,
      person_id: formData.person_id,
    });

  if (insertError) {
    console.error(insertError);
    throw new Error('Error adding role');
  }

  // Revalidate the movie page in case the roles were updated
  revalidatePath(`/movie/${movieId}`, 'page');
  revalidatePath(`/movie/${movieId}/edit/cast`, 'page');
  redirect(`/movie/${movieId}/edit/cast`);
}

export async function updateMovieAction(
  movieId: number,
  formData: MovieEditFormSchema,
) {
  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

  if (!movieId) {
    throw new Error('No movie ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: movie, error } = await getMovieById(supabase, movieId);

  if (error || !movie) {
    throw new Error('Error fetching movie');
  }

  const { error: updateError } = await supabase
    .from('movies')
    .update({
      ...formData,
      format: formData.format === 'Unknown' ? null : formData.format,
    })
    .eq('id', movieId);

  if (updateError) {
    console.error(updateError);
    throw new Error('Error updating movie');
  }

  // Revalidate the homepage in case the movie updated was on the homepage
  revalidatePath('/', 'page');
  redirect(`/movie/${movieId}`);
}

export async function deleteMovieAction(id: number | undefined) {
  const cookieStore = await cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = createClient(cookieStore);

  if (!id) {
    throw new Error('No movie ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: movie, error } = await getMovieById(supabase, id);

  if (error || !movie) {
    throw new Error('Error fetching movie');
  }

  try {
    await Promise.all(
      movie.movie_images.map(async ({ image }) => {
        if (image) {
          await cloudflare.images.v1
            .delete(image.uuid, {
              account_id: process.env.CLOUDFLARE_ACCOUNT_ID ?? '',
            })
            .catch(() => {
              // Ignore errors deleting images
            });
        }
      }),
    );
  } catch {
    // Ignore errors deleting images
  }

  // Delete the movie from the database
  const { error: deleteError } = await supabase
    .from('movies')
    .delete()
    .match({ id });

  if (deleteError) {
    throw new Error('Error deleting movie');
  }

  // Revalidate the homepage in case the movie deleted was on the homepage
  revalidatePath('/', 'page');
  redirect('/');
}
