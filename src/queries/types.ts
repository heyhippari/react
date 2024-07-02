import { Tables } from '@/utils/database.types';

type Role = Omit<Tables<'roles'>, 'id' | 'movie_id' | 'person_id'>;
// Person only has id, name, and original_name fields
export type Person = Pick<
  Tables<'persons'>,
  'id' | 'name' | 'original_name'
> | null;

export type RoleWithPerson = Role & {
  person: Person;
};

type Movie = Pick<Tables<'movies'>, 'id' | 'name' | 'original_name' | 'dvd_id'>;
type Images = Pick<Tables<'images'>, 'uuid' | 'type'> | null;
export type MovieImage = Omit<
  Tables<'movie_images'>,
  'id' | 'movie_id' | 'image_id'
> & { image: Images };

export type MovieWithImages =
  | (Movie & {
      movie_images: MovieImage[];
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
    'create_time' | 'update_time' | 'studio_movies_count'
  > | null;
  roles: RoleWithPerson[];
};

export type MovieWithAll =
  | (MovieWithImages & {
      roles: RoleWithPerson[];
    })
  | null
  | undefined;

export type UserProfile = Tables<'profiles'>;
