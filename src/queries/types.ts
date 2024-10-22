import { Enums, Tables } from '@/utils/database.types';

type Images = Pick<Tables<'images'>, 'uuid' | 'type'> | null;
export type MovieImage = Omit<
  Tables<'movie_images'>,
  'id' | 'movie_id' | 'image_id'
> & { image: Images };
export type PersonImage = Omit<
  Tables<'person_images'>,
  'id' | 'person_id' | 'image_id'
> & { image: Images };

export type Role = Omit<Tables<'roles'>, 'id' | 'movie_id' | 'person_id'>;
// Person only has id, name, and original_name fields
export type Person = Pick<
  Tables<'persons'>,
  'id' | 'name' | 'original_name'
> | null;

export type RoleWithPerson = Role & {
  person: PersonWithImage;
};

export type PersonWithImage =
  | (Person & Pick<Tables<'persons'>, 'profile_url'>)
  | null
  | undefined;

export type Movie = Pick<
  Tables<'movies'>,
  'id' | 'name' | 'original_name' | 'dvd_id'
>;

export type Series = Pick<Tables<'series'>, 'id' | 'name' | 'original_name'>;

export type MovieWithImages =
  | (Movie & {
      front_cover_url?: string | null;
      full_cover_url?: string | null;
    })
  | null
  | undefined;

export type MovieWithImagesStudioAndRoles = Pick<
  Tables<'movies'>,
  'id' | 'name' | 'original_name' | 'dvd_id' | 'release_date' | 'length'
> & {
  movie_images: MovieImage[];
  studio: Omit<
    Tables<'studios'>,
    | 'create_time'
    | 'update_time'
    | 'studio_movies_count'
    | 'homepage'
    | 'fts_doc'
  > | null;
  roles: RoleWithPerson[];
};

export type MovieWithAll =
  | (MovieWithImages & {
      roles: RoleWithPerson[];
      movie_images: MovieImage[];
    } & Pick<Tables<'movies'>, 'release_date' | 'length'> & {
        series: Series | null;
        studio: Omit<
          Tables<'studios'>,
          | 'create_time'
          | 'update_time'
          | 'studio_movies_count'
          | 'homepage'
          | 'fts_doc'
        > | null;
      })
  | null
  | undefined;

export type PersonWithAll = 
  | (PersonWithImage & {
    person_images: PersonImage[];
    roles: Role[];
  })
  | null
  | undefined;

export type UserProfile = Tables<'profiles'>;

export type ItemWithImages = MovieWithImages | PersonWithImage;
export type Item = MovieWithAll | PersonWithAll | Series;

export type MediaFormat = Enums<'media_format'>;
