import { getSupabaseBrowserClient } from '@/utils/supabase/client';
import { QueryData } from '@supabase/supabase-js';

// Returns a movie with all images
const getMovieWithImages = getSupabaseBrowserClient()
  .from('movies')
  .select(
    `
    id,
    name,
    original_name,
    dvd_id,
    movie_images (
        images (
          uuid,
          type
        )
      )
    `,
  )
  .single();

export type MovieWithImages = QueryData<typeof getMovieWithImages>;
