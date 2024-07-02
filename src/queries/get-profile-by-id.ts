import { TypedSupabaseClient } from '@/utils/types';

export function getProfileById(client: TypedSupabaseClient, userId: string) {
  return client.from('profiles').select('*').eq('id', userId).single();
}
