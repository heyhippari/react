import useSupabaseServer from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  return redirect('/');
}
