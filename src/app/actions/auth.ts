'use server';
import useSupabaseServer from '@/utils/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function loginAction(formData: FormData) {
  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

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
      redirectTo: `${defaultUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  if (data.url) {
    revalidatePath(data.url, 'layout');
    redirect(data.url);
  }
}
