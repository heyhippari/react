import { Enums, Tables } from "@/utils/database.types";

type Images = null | Pick<Tables<"images">, "type" | "uuid">;
export type MovieImage =
  & { image: Images }
  & Omit<
    Tables<"movie_images">,
    "id" | "image_id" | "movie_id"
  >;
export type PersonImage =
  & { image: Images }
  & Omit<
    Tables<"person_images">,
    "id" | "image_id" | "person_id"
  >;

export type Role = Omit<Tables<"roles">, "movie_id" | "person_id">;
// Person only has id, name, and original_name fields
export type Person =
  | null
  | Pick<
    Tables<"persons">,
    "id" | "name" | "original_name"
  >;

export type RoleWithPerson = {
  person: PersonWithImage;
} & Role;

export type PersonWithImage =
  | null
  | (Person & Pick<Tables<"persons">, "profile_url">)
  | undefined;

export type Movie = Pick<
  Tables<"movies">,
  "dvd_id" | "id" | "name" | "original_name"
>;

export type Series = Pick<Tables<"series">, "id" | "name" | "original_name">;

export type Label = Pick<Tables<"labels">, "id" | "name" | "original_name">;

export type Studio = Pick<Tables<"studios">, "id" | "name" | "original_name">;

export type MovieWithImages =
  | ({
    front_cover_url?: null | string;
    full_cover_url?: null | string;
  } & Movie)
  | null
  | undefined;

export type MovieWithImagesStudioAndRoles =
  & {
    movie_images: MovieImage[];
    roles: RoleWithPerson[];
    studio:
      | null
      | Omit<
        Tables<"studios">,
        | "create_time"
        | "fts_doc"
        | "homepage"
        | "studio_movies_count"
        | "update_time"
      >;
  }
  & Pick<
    Tables<"movies">,
    "dvd_id" | "id" | "length" | "name" | "original_name" | "release_date"
  >;

export type MovieWithAll =
  | (
    & {
      movie_images: MovieImage[];
      roles: RoleWithPerson[];
    }
    & {
      series: null | Series;
      studio:
        | null
        | Omit<
          Tables<"studios">,
          | "create_time"
          | "fts_doc"
          | "homepage"
          | "studio_movies_count"
          | "update_time"
        >;
    }
    & MovieWithImages
    & Pick<Tables<"movies">, "length" | "release_date">
  )
  | null
  | undefined;

export type PersonWithAll =
  | ({
    person_images: PersonImage[];
    roles: Role[];
  } & PersonWithImage)
  | null
  | undefined;

export type UserProfile = Tables<"profiles">;

export type ItemWithImages = MovieWithImages | PersonWithImage;
export type Item = Label | MovieWithAll | PersonWithAll | Series | Studio;

export type MediaFormat = Enums<"media_format">;
