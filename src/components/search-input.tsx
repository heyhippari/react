'use client';
import { useRouter } from 'next/navigation';

import { Input } from './ui/input';

/**
 * Search input for searching for a movie by ID.
 * @returns The rendered component.
 */
export function SearchInput() {
  const router = useRouter();

  /**
   * Handle the search form submission.
   * @param event The form submission event.
   */
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(
      `/movie?q=${(event.currentTarget.q as HTMLInputElement).value}`,
      {
        scroll: false,
      },
    );
  }

  return (
    <form onSubmit={handleSearch}>
      <Input
        className="border-pink-400 bg-pink-100 shadow-none dark:border-pink-900 dark:bg-pink-700"
        name="q"
        placeholder="Search an ID... (ABC-123)"
      />
    </form>
  );
}
