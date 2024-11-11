"use server";

import { cookies } from "next/headers";

/**
 * Switches the current locale.
 * @param locale The locale to switch to.
 */
export async function switchLocaleAction(locale: string) {
  const requestCookies = await cookies();

  requestCookies.set("locale", locale);
}
