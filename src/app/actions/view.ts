'use server';

import { registerItemView } from '@/queries/views';
import { sha256 } from '@/utils/hash';
import useSupabaseServer from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';

export async function registerViewAction(
  itemId: number | string,
  itemType: 'movie' | 'person' | 'series' | 'studio' | 'label',
) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseServer(cookieStore);

  // If this is a development environment, we don't want to register views
  // since it will mess up production data.
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  if (!itemId) {
    throw new Error('No item ID provided');
  }

  if (!['movie', 'person', 'series', 'studio', 'label'].includes(itemType)) {
    throw new Error('Invalid item type');
  }

  if (typeof itemId === 'string') {
    itemId = parseInt(itemId, 10);
  }

  if (isNaN(itemId)) {
    throw new Error('Invalid item ID');
  }

  // Just make sure we get SOMETHING, no matter which header it is
  // NEVER store this as-is, since it's PII. Always hash it with other data
  // before storing it.
  const clientIp =
    headers().get('x-forwarded-for') ??
    headers().get('cf-connecting-ip') ??
    headers().get('x-real-ip') ??
    headers().get('x-forwarded-host');
  const userAgent = headers().get('user-agent');
  const currentDate = new Date().toISOString().split('T')[0];

  // We hash the client IP, user agent, and current date to create a unique
  // identifier for the client. This is to prevent duplicate views from the
  // same client, but also to prevent storing PII directly.
  const clientHash = await sha256(`${clientIp}-${userAgent}-${currentDate}`);

  const { error } = await registerItemView(
    supabase,
    itemType,
    itemId,
    clientHash,
  );

  if (error) {
    throw new Error('Error registering view', { cause: error });
  }

  return true;
}
