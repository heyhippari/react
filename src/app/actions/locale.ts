'use server';

import { cookies } from 'next/headers';

export function switchLocaleAction(locale: string) {
  cookies().set('locale', locale);

  return;
}
