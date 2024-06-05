import { getProfileById } from '@/queries/get-profile-by-id';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import UserMenu from './user-menu';

export default async function SiteHeader() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  let profile = null;

  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    const { data: profileResponse, error: profileError } = await getProfileById(
      supabase,
      data.user?.id || '',
    );
    if (profileError) {
      console.error('Error getting profile', profileError);
      return null;
    }

    profile = profileResponse;
  }

  return (
    <nav className="start-0 top-0 z-20 w-full border-b border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          href="/"
        >
          <span className="self-center whitespace-nowrap border-l-4 border-l-blue-500 pl-3 text-4xl font-bold dark:text-white">
            Kanojo
          </span>
        </Link>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {
            //<LocaleMenu />
          }
          {data.user ? (
            <UserMenu profile={profile} />
          ) : (
            <Link className={buttonVariants()} href="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
