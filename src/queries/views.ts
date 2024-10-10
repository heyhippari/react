import { TypedSupabaseClient } from '@/utils/types';

export function registerItemView(
  client: TypedSupabaseClient,
  itemType: 'movie' | 'person' | 'series' | 'studio' | 'label',
  itemId: number,
  clientHash: string,
) {
  return client.from('views').insert({
    client_hash: clientHash,
    item_type: itemType,
    item_id: itemId,
  });
}
