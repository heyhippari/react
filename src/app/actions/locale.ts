'use server';

import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';

export function switchLocaleAction(locale: string) {
  (cookies() as unknown as UnsafeUnwrappedCookies).set('locale', locale);

  return;
}
