import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return <p>{JSON.stringify(data.user)}</p>;
}