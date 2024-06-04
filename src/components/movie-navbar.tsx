import Link from 'next/link';
import { useMemo } from 'react';
import { Button, buttonVariants } from './ui/button';

export default function MovieNavbar({ movie }: { movie: any }) {
  const isServer = typeof window === 'undefined';

  const supportsShareAPI = useMemo(() => {
    if (isServer) return false;
    return navigator?.share !== undefined;
  }, [isServer]);

  const handleShare = async () => {
    if (supportsShareAPI) {
      try {
        await navigator.share({
          title: `${movie?.dvd_id} (${movie?.name ?? movie?.original_name})`,
          text: `Find out more about ${movie?.dvd_id} on Kanojo`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <nav className="start-0 top-0 z-20 w-full border-b border-gray-200 bg-slate-100 p-2 dark:border-gray-600 dark:bg-gray-700">
      <div className="container mx-auto flex flex-wrap items-center justify-center px-4">
        <Link
          className={buttonVariants({ variant: 'ghost' })}
          href={`/movie/${movie?.id}`}
        >
          Details
        </Link>
        {
          //<Button variant={'ghost'}>Images</Button>
        }
        <Button variant={'ghost'} onClick={handleShare}>
          Share
        </Button>
      </div>
    </nav>
  );
}
