import { TypedSupabaseClient } from '@/utils/types';

export function registerItemView(
  client: TypedSupabaseClient,
  itemType: 'label' | 'movie' | 'person' | 'series' | 'studio',
  itemId: number,
  clientHash: string,
) {
  return client.from('views').insert({
    client_hash: clientHash,
    item_id: itemId,
    item_type: itemType,
  });
}
