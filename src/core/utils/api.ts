/**
 * Omit null values from JSON.stringify.
 * @param key - The key of the value.
 * @param value - The value to check.
 * @returns The value if it is not null, otherwise undefined.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is the intended type
export function omitNulls(this: any, key: string, value: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- This is the intended return value
  return value ?? undefined;
}
