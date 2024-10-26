'use client';
import { useRouter } from 'next/navigation';

import { Input } from './ui/input';

export function SearchInput() {
  const router = useRouter();

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
