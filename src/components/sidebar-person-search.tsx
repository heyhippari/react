'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

/**
 * Sidebar for searching a person.
 * @param properties The properties for the component.
 * @param properties.direction The direction to order the persons by.
 * @param properties.order The column to order the persons by.
 * @param properties.q The search query to use.
 * @returns The rendered component.
 */
export default function SidebarPersonSearch({
  direction,
  order,
  q,
}: Readonly<{
  direction?: 'asc' | 'desc';
  order?: string;
  q?: string;
}>) {
  const router = useRouter();

  /**
   * Handle the search form submission.
   * @param event The form submission event.
   * // TODO: Refactor this to use the useForm hook.
   */
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchParameters = new URLSearchParams({
      page: '1',
    });

    if ((event.currentTarget.q as HTMLInputElement).value) {
      searchParameters.set(
        'q',
        (event.currentTarget.q as HTMLInputElement).value,
      );
    }

    if ((event.currentTarget.order as HTMLSelectElement).value) {
      searchParameters.set(
        'order',
        (event.currentTarget.order as HTMLSelectElement).value,
      );
    }

    if ((event.currentTarget.direction as HTMLSelectElement).value) {
      searchParameters.set(
        'direction',
        (event.currentTarget.direction as HTMLSelectElement).value,
      );
    }

    router.push(`/person?${searchParameters.toString()}`, {
      scroll: false,
    });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSearch}>
      <Input defaultValue={q} name="q" placeholder="Search" />
      <div className="flex flex-col gap-2">
        <Label htmlFor="order">Order by</Label>
        <Select defaultValue={order} name="order">
          <SelectTrigger>
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="original_name">Original Name</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="birth_date">Birth Date</SelectItem>
            <SelectItem value="create_time">Date Added</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="direction">Direction</Label>
        <Select defaultValue={direction} name="direction">
          <SelectTrigger>
            <SelectValue placeholder="Ascending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
