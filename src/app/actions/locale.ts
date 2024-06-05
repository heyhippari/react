'use server';

import { cookies } from 'next/headers';

export async function switchLocaleAction(locale: string) {
  cookies().set('locale', locale);

  return;
}
