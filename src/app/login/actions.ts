'use server';
import useSupabaseServer from '@/utils/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  const provider = formData.get('provider') as Provider;

  // For safety, we only allow supported providers.
  if (!['discord'].includes(provider)) {
    redirect('/error');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: 'https://next.kanojodb.com/auth/callback',
    },
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  if (data.url) {
    redirect(data.url);
  }
}
