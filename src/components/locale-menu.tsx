'use client';

import { switchLocaleAction } from '@/app/actions/locale';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function LocaleMenu() {
  const handleLocaleChange = (value: string) => {
    switchLocaleAction(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'ghost'}>Locale</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-72 flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold text-pink-900 dark:text-pink-50">
          Language Preferences
        </h2>
        <h3 className="text-sm font-semibold text-pink-600 dark:text-pink-400">
          Default Language
        </h3>
        <Select onValueChange={handleLocaleChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="jp">Japanese</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
