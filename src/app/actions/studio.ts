'use server';
import { getStudioById } from '@/queries/get-studio-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteStudioAction(id: number | undefined) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  if (!id) {
    throw new Error('No studio ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: studio, error } = await getStudioById(supabase, id);

  if (error || !studio) {
    throw new Error('Error fetching movie');
  }

  // Delete the movie from the database
  const { error: deleteError } = await supabase
    .from('studios')
    .delete()
    .match({ id });

  if (deleteError) {
    throw new Error('Error deleting studio');
  }

  // Revalidate the homepage in case the movie deleted was on the homepage
  revalidatePath('/', 'page');
  redirect('/');
}
