'use server';
import createClient from '@/utils/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Logs out the current user.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}

/**
 * Logs in the user using the specified provider.
 * @param formData The form data containing the provider.
 */
export async function loginAction(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const defaultUrl = process.env.VERCEL_URL
    ? `https://kanojodb.com`
    : 'http://localhost:3000';

  const provider = formData.get('provider') as Provider;

  // For safety, we only allow supported providers.
  if (!['discord'].includes(provider)) {
    redirect('/error');
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: `${defaultUrl}/auth/callback`,
    },
    provider: provider,
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
