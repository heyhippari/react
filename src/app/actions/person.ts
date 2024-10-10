'use server';
import { getPersonById } from '@/queries/get-person-by-id';
import { cloudflare } from '@/utils/cloudflare';
import useSupabaseServer from '@/utils/supabase/server';
import { PersonEditFormSchema } from '@/utils/validation/person-update';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function updatePersonAction(
  personId: number,
  formData: PersonEditFormSchema,
) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  if (!personId) {
    throw new Error('No person ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: person, error } = await getPersonById(supabase, personId);

  if (error || !person) {
    throw new Error('Error fetching person', { cause: error });
  }

  const { error: updateError } = await supabase
    .from('persons')
    .update({
      ...formData,
    })
    .eq('id', personId);

  if (updateError) {
    throw new Error('Error updating movie', {
      cause: updateError,
    });
  }

  // Revalidate the homepage in case the movie updated was on the homepage
  revalidatePath('/', 'page');
  redirect(`/person/${personId}`);
}

export async function deletePersonAction(id: number | undefined) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  if (!id) {
    throw new Error('No person ID provided');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: person, error } = await getPersonById(supabase, id);

  if (error || !person) {
    throw new Error('Error fetching person', { cause: error });
  }

  try {
    await Promise.all(
      person.person_images.map(async ({ image }) => {
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
    .from('persons')
    .delete()
    .match({ id });

  if (deleteError) {
    throw new Error('Error deleting person', {
      cause: deleteError,
    });
  }

  // Revalidate the homepage in case the movie deleted was on the homepage
  revalidatePath('/', 'page');
  redirect('/');
}
