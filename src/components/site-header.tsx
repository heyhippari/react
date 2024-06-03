import useSupabaseServer from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

export default async function SiteHeader() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data } = await supabase.auth.getUser();

  return (
    <nav className="start-0 top-0 z-20 w-full border-b border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Kanojo
          </span>
        </a>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {data.user ? (
            <></>
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
