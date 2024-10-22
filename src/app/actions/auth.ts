'use server';
import createClient from '@/utils/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}

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
