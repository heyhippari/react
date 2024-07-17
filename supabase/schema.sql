SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "atlas_schema_revisions";

ALTER SCHEMA "atlas_schema_revisions" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

ALTER SCHEMA "public" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."app_permission" AS ENUM (
    'movie.delete',
    'person.delete',
    'series.delete',
    'studio.delete',
    'category.delete',
    'label.delete',
    'image.delete',
    'job.delete',
    'role.delete',
    'tag.delete'
);

ALTER TYPE "public"."app_permission" OWNER TO "postgres";

CREATE TYPE "public"."app_role" AS ENUM (
    'admin',
    'moderator',
    'user',
    'banned'
);

ALTER TYPE "public"."app_role" OWNER TO "postgres";

CREATE TYPE "public"."image_type" AS ENUM (
    'front_cover',
    'full_cover',
    'art',
    'disc',
    'profile',
    'logo',
    'screenshot'
);

ALTER TYPE "public"."image_type" OWNER TO "postgres";

COMMENT ON TYPE "public"."image_type" IS 'Types of images for various entities';

CREATE OR REPLACE FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") RETURNS boolean
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  bind_permissions int;
  user_role public.app_role;
begin
  -- Fetch user role once and store it to reduce number of calls
  select (auth.jwt() ->> 'user_role')::public.app_role into user_role;

  select count(*)
  into bind_permissions
  from public.role_permissions
  where role_permissions.permission = requested_permission
    and role_permissions.role = user_role;

  return bind_permissions > 0;
end;
$$;

ALTER FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."custom_access_token_hook"("event" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;

ALTER FUNCTION "public"."custom_access_token_hook"("event" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$declare gravatar_url text;
begin
  gravatar_url := 'https://www.gravatar.com/avatar/' || md5(new.email) || '?d=404';

  insert into public.profiles (id, username, avatar_url, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', gravatar_url, new.email);
  return new;
end;$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."persons" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "update_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL,
    "birth_date" timestamp with time zone
);

ALTER TABLE "public"."persons" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."persons_movies_count"("public"."persons") RETURNS bigint
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $_$
  select count(*) from public.roles where person_id = $1.id;
$_$;

ALTER FUNCTION "public"."persons_movies_count"("public"."persons") OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."series" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "update_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL
);

ALTER TABLE "public"."series" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."series_movies_count"("public"."series") RETURNS bigint
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $_$
  select count(*) from public.movies where series_id = $1.id;
$_$;

ALTER FUNCTION "public"."series_movies_count"("public"."series") OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."studios" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "update_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL
);

ALTER TABLE "public"."studios" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."studio_movies_count"("public"."studios") RETURNS bigint
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $_$
  select count(*) from public.movies where studio_id = $1.id;
$_$;

ALTER FUNCTION "public"."studio_movies_count"("public"."studios") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_role_age_create"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$BEGIN
  DECLARE
    movie_record RECORD;
    person_record RECORD;
    new_age INT;
  BEGIN
    SELECT * INTO movie_record
    FROM public.movies
    WHERE movies.id = NEW.movie_id;

    SELECT * INTO person_record
    FROM public.persons
    WHERE persons.id = NEW.person_id;

    -- Calculate age using date arithmetic
    new_age := EXTRACT(YEAR FROM AGE(movie_record.release_date, person_record.birth_date));

    UPDATE public.roles
    SET age = new_age
    WHERE id = NEW.id;

    RETURN NEW;
  END;
END;$$;

ALTER FUNCTION "public"."update_role_age_create"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_role_age_movies"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    UPDATE public.roles
    SET age = EXTRACT(YEAR FROM AGE(NEW.release_date, persons.birth_date))
    FROM public.persons
    WHERE roles.movie_id = NEW.id AND roles.person_id = persons.id;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_role_age_movies"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_role_age_persons"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    UPDATE public.roles
    SET age = EXTRACT(YEAR FROM AGE(movies.release_date, NEW.birth_date))
    FROM public.movies
    WHERE roles.person_id = NEW.id AND roles.movie_id = movies.id;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_role_age_persons"() OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "atlas_schema_revisions"."atlas_schema_revisions" (
    "version" character varying NOT NULL,
    "description" character varying NOT NULL,
    "type" bigint DEFAULT 2 NOT NULL,
    "applied" bigint DEFAULT 0 NOT NULL,
    "total" bigint DEFAULT 0 NOT NULL,
    "executed_at" timestamp with time zone NOT NULL,
    "execution_time" bigint NOT NULL,
    "error" "text",
    "error_stmt" "text",
    "hash" character varying NOT NULL,
    "partial_hashes" "jsonb",
    "operator_version" character varying NOT NULL
);

ALTER TABLE "atlas_schema_revisions"."atlas_schema_revisions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone NOT NULL,
    "update_time" timestamp with time zone NOT NULL,
    "name" character varying NOT NULL,
    "parent_id" bigint
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

COMMENT ON COLUMN "public"."categories"."parent_id" IS 'Parent of the category. One to one. If empty, this category is a top-level one.';

ALTER TABLE "public"."categories" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."images" (
    "id" bigint NOT NULL,
    "uuid" "text" NOT NULL,
    "type" "public"."image_type" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."images" OWNER TO "postgres";

COMMENT ON TABLE "public"."images" IS 'Information about images linked to various entities.';

ALTER TABLE "public"."images" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."images_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."jobs" (
    "id" bigint NOT NULL,
    "type" character varying,
    "movie_id" bigint NOT NULL,
    "person_id" bigint NOT NULL
);

ALTER TABLE "public"."jobs" OWNER TO "postgres";

ALTER TABLE "public"."jobs" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."jobs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."labels" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "update_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL
);

ALTER TABLE "public"."labels" OWNER TO "postgres";

ALTER TABLE "public"."labels" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."labels_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."movie_images" (
    "id" bigint NOT NULL,
    "movie_id" bigint NOT NULL,
    "image_id" bigint NOT NULL
);

ALTER TABLE "public"."movie_images" OWNER TO "postgres";

ALTER TABLE "public"."movie_images" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."movie_images_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."movies" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "update_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL,
    "release_date" timestamp with time zone,
    "dvd_id" character varying,
    "length" smallint,
    "label_id" bigint,
    "series_id" bigint,
    "studio_id" bigint
);

ALTER TABLE "public"."movies" OWNER TO "postgres";

ALTER TABLE "public"."movies" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."movies_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" bigint NOT NULL,
    "age" smallint,
    "movie_id" bigint NOT NULL,
    "person_id" bigint NOT NULL
);

ALTER TABLE "public"."roles" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."movies_missing_info" WITH ("security_invoker"='on') AS
 SELECT "movies"."id",
    "movies"."name",
    "movies"."original_name",
    "movies"."release_date",
    "movies"."dvd_id"
   FROM "public"."movies"
  WHERE (("movies"."release_date" IS NULL) OR ("movies"."name" IS NULL) OR ("movies"."length" IS NULL) OR ("movies"."studio_id" IS NULL) OR (NOT (EXISTS ( SELECT 1
           FROM "public"."movie_images"
          WHERE ("movie_images"."movie_id" = "movies"."id")))) OR (NOT (EXISTS ( SELECT 1
           FROM "public"."roles"
          WHERE ("roles"."movie_id" = "movies"."id")))))
  ORDER BY ("random"());

ALTER TABLE "public"."movies_missing_info" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."movies_released_today" WITH ("security_invoker"='on') AS
 SELECT "movies"."id",
    "movies"."create_time",
    "movies"."update_time",
    "movies"."name",
    "movies"."original_name",
    "movies"."release_date",
    "movies"."dvd_id",
    "movies"."length",
    "movies"."label_id",
    "movies"."series_id",
    "movies"."studio_id"
   FROM "public"."movies"
  WHERE ((EXTRACT(month FROM "movies"."release_date") = EXTRACT(month FROM CURRENT_DATE)) AND (EXTRACT(day FROM "movies"."release_date") = EXTRACT(day FROM CURRENT_DATE)))
  ORDER BY ("random"())
 LIMIT 25;

ALTER TABLE "public"."movies_released_today" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."movies_without_images" WITH ("security_invoker"='on') AS
 SELECT "movies"."dvd_id"
   FROM "public"."movies"
  WHERE (NOT ("movies"."id" IN ( SELECT "movie_images"."movie_id"
           FROM "public"."movie_images")))
  ORDER BY "movies"."dvd_id";

ALTER TABLE "public"."movies_without_images" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."person_images" (
    "id" bigint NOT NULL,
    "person_id" bigint NOT NULL,
    "image_id" bigint NOT NULL
);

ALTER TABLE "public"."person_images" OWNER TO "postgres";

ALTER TABLE "public"."person_images" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."person_images_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."persons_aliases" (
    "id" bigint NOT NULL,
    "person_id" bigint NOT NULL,
    "name" "text",
    "original_name" "text"
);

ALTER TABLE "public"."persons_aliases" OWNER TO "postgres";

COMMENT ON TABLE "public"."persons_aliases" IS 'Aliases used by persons';

ALTER TABLE "public"."persons_aliases" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."persons_aliases_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."persons" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."persons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "username" "text",
    "avatar_url" "text",
    "create_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text"
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."role_permissions" (
    "id" bigint NOT NULL,
    "role" "public"."app_role" NOT NULL,
    "permission" "public"."app_permission" NOT NULL
);

ALTER TABLE "public"."role_permissions" OWNER TO "postgres";

COMMENT ON TABLE "public"."role_permissions" IS 'Application permissions for each role.';

ALTER TABLE "public"."role_permissions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."role_permissions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE OR REPLACE VIEW "public"."roles_by_age" WITH ("security_invoker"='on') AS
 SELECT "roles"."age",
    "count"(*) AS "count"
   FROM "public"."roles"
  GROUP BY "roles"."age"
  ORDER BY "roles"."age";

ALTER TABLE "public"."roles_by_age" OWNER TO "postgres";

ALTER TABLE "public"."roles" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."roles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."series" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."series_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE "public"."studios" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."studios_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."tags" (
    "category_id" bigint NOT NULL,
    "movie_id" bigint NOT NULL
);

ALTER TABLE "public"."tags" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_roles" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role" "public"."app_role" NOT NULL
);

ALTER TABLE "public"."user_roles" OWNER TO "postgres";

COMMENT ON TABLE "public"."user_roles" IS 'Application roles for each user.';

ALTER TABLE "public"."user_roles" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."user_roles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "atlas_schema_revisions"."atlas_schema_revisions"
    ADD CONSTRAINT "atlas_schema_revisions_pkey" PRIMARY KEY ("version");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "category_movies_pkey" PRIMARY KEY ("category_id", "movie_id");

ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_uuid_key" UNIQUE ("uuid");

ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."labels"
    ADD CONSTRAINT "labels_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."movie_images"
    ADD CONSTRAINT "movie_images_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."movies"
    ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."person_images"
    ADD CONSTRAINT "person_images_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."persons_aliases"
    ADD CONSTRAINT "persons_aliases_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."persons"
    ADD CONSTRAINT "persons_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_role_permission_key" UNIQUE ("role", "permission");

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."studios"
    ADD CONSTRAINT "studios_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_role_key" UNIQUE ("user_id", "role");

CREATE INDEX "categories_parent_id_idx" ON "public"."categories" USING "btree" ("parent_id");

CREATE INDEX "category_movies_category_id_idx" ON "public"."tags" USING "btree" ("category_id");

CREATE INDEX "category_movies_movie_id_idx" ON "public"."tags" USING "btree" ("movie_id");

CREATE UNIQUE INDEX "job_person_id_movie_id" ON "public"."jobs" USING "btree" ("person_id", "movie_id");

CREATE INDEX "jobs_movie_id_idx" ON "public"."jobs" USING "btree" ("movie_id");

CREATE INDEX "jobs_person_id_idx" ON "public"."jobs" USING "btree" ("person_id");

CREATE INDEX "movie_dvd_id" ON "public"."movies" USING "btree" ("dvd_id");

CREATE INDEX "movie_release_date" ON "public"."movies" USING "btree" ("release_date");

CREATE INDEX "movies_create_time_idx" ON "public"."movies" USING "btree" ("create_time");

CREATE INDEX "movies_label_id_idx" ON "public"."movies" USING "btree" ("label_id");

CREATE INDEX "movies_series_id_idx" ON "public"."movies" USING "btree" ("series_id");

CREATE INDEX "movies_studio_id_idx" ON "public"."movies" USING "btree" ("studio_id");

CREATE INDEX "movies_update_time_idx" ON "public"."movies" USING "btree" ("update_time");

CREATE UNIQUE INDEX "role_person_id_movie_id" ON "public"."roles" USING "btree" ("person_id", "movie_id");

CREATE INDEX "roles_movie_id_idx" ON "public"."roles" USING "btree" ("movie_id");

CREATE INDEX "roles_person_id_idx" ON "public"."roles" USING "btree" ("person_id");

CREATE OR REPLACE TRIGGER "update_role_age_after_movie_update" AFTER UPDATE OF "release_date" ON "public"."movies" FOR EACH ROW EXECUTE FUNCTION "public"."update_role_age_movies"();

CREATE OR REPLACE TRIGGER "update_role_age_after_person_update" AFTER UPDATE OF "birth_date" ON "public"."persons" FOR EACH ROW EXECUTE FUNCTION "public"."update_role_age_persons"();

CREATE OR REPLACE TRIGGER "update_role_age_create" AFTER INSERT ON "public"."roles" FOR EACH ROW EXECUTE FUNCTION "public"."update_role_age_create"();

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "category_movies_category_id" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "category_movies_movie_id" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_movies_movie" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id");

ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_persons_person" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id");

ALTER TABLE ONLY "public"."movie_images"
    ADD CONSTRAINT "movie_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."movie_images"
    ADD CONSTRAINT "movie_images_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."movies"
    ADD CONSTRAINT "movies_labels_movies" FOREIGN KEY ("label_id") REFERENCES "public"."labels"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."movies"
    ADD CONSTRAINT "movies_series_movies" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."movies"
    ADD CONSTRAINT "movies_studios_movies" FOREIGN KEY ("studio_id") REFERENCES "public"."studios"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."person_images"
    ADD CONSTRAINT "person_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."person_images"
    ADD CONSTRAINT "person_images_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."persons_aliases"
    ADD CONSTRAINT "persons_aliases_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_movies_movie" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_persons_person" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id");

ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

CREATE POLICY "Allow auth admin to read user roles" ON "public"."role_permissions" FOR SELECT TO "supabase_auth_admin" USING (true);

CREATE POLICY "Allow auth admin to read user roles" ON "public"."user_roles" FOR SELECT TO "supabase_auth_admin" USING (true);

CREATE POLICY "Allow authorized delete access" ON "public"."movies" FOR DELETE USING (( SELECT "public"."authorize"('movie.delete'::"public"."app_permission") AS "authorize"));

CREATE POLICY "Enable read access for all users" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."images" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."jobs" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."labels" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."movie_images" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."movies" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."person_images" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."persons" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."persons_aliases" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."roles" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."series" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."studios" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."tags" FOR SELECT USING (true);

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."images" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."jobs" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."labels" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."movie_images" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."movies" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."person_images" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."persons" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."persons_aliases" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."role_permissions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."series" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."studios" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tags" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_roles" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "supabase_auth_admin";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") TO "anon";
GRANT ALL ON FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") TO "authenticated";
GRANT ALL ON FUNCTION "public"."authorize"("requested_permission" "public"."app_permission") TO "service_role";

REVOKE ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "supabase_auth_admin";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."persons" TO "authenticated";
GRANT ALL ON TABLE "public"."persons" TO "anon";
GRANT ALL ON TABLE "public"."persons" TO "service_role";

GRANT ALL ON FUNCTION "public"."persons_movies_count"("public"."persons") TO "anon";
GRANT ALL ON FUNCTION "public"."persons_movies_count"("public"."persons") TO "authenticated";
GRANT ALL ON FUNCTION "public"."persons_movies_count"("public"."persons") TO "service_role";

GRANT ALL ON TABLE "public"."series" TO "authenticated";
GRANT ALL ON TABLE "public"."series" TO "anon";
GRANT ALL ON TABLE "public"."series" TO "service_role";

GRANT ALL ON FUNCTION "public"."series_movies_count"("public"."series") TO "anon";
GRANT ALL ON FUNCTION "public"."series_movies_count"("public"."series") TO "authenticated";
GRANT ALL ON FUNCTION "public"."series_movies_count"("public"."series") TO "service_role";

GRANT ALL ON TABLE "public"."studios" TO "authenticated";
GRANT ALL ON TABLE "public"."studios" TO "anon";
GRANT ALL ON TABLE "public"."studios" TO "service_role";

GRANT ALL ON FUNCTION "public"."studio_movies_count"("public"."studios") TO "anon";
GRANT ALL ON FUNCTION "public"."studio_movies_count"("public"."studios") TO "authenticated";
GRANT ALL ON FUNCTION "public"."studio_movies_count"("public"."studios") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_role_age_create"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_role_age_create"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_role_age_create"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_role_age_movies"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_role_age_movies"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_role_age_movies"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_role_age_persons"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_role_age_persons"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_role_age_persons"() TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."images" TO "authenticated";
GRANT ALL ON TABLE "public"."images" TO "anon";
GRANT ALL ON TABLE "public"."images" TO "service_role";

GRANT ALL ON SEQUENCE "public"."images_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."images_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."images_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."jobs" TO "anon";
GRANT ALL ON TABLE "public"."jobs" TO "service_role";

GRANT ALL ON SEQUENCE "public"."jobs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."jobs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."jobs_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."labels" TO "authenticated";
GRANT ALL ON TABLE "public"."labels" TO "anon";
GRANT ALL ON TABLE "public"."labels" TO "service_role";

GRANT ALL ON SEQUENCE "public"."labels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."labels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."labels_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."movie_images" TO "authenticated";
GRANT ALL ON TABLE "public"."movie_images" TO "anon";
GRANT ALL ON TABLE "public"."movie_images" TO "service_role";

GRANT ALL ON SEQUENCE "public"."movie_images_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."movie_images_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."movie_images_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."movies" TO "authenticated";
GRANT ALL ON TABLE "public"."movies" TO "anon";
GRANT ALL ON TABLE "public"."movies" TO "service_role";

GRANT ALL ON SEQUENCE "public"."movies_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."movies_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."movies_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "service_role";

GRANT ALL ON TABLE "public"."movies_missing_info" TO "authenticated";
GRANT ALL ON TABLE "public"."movies_missing_info" TO "anon";
GRANT ALL ON TABLE "public"."movies_missing_info" TO "service_role";

GRANT ALL ON TABLE "public"."movies_released_today" TO "authenticated";
GRANT ALL ON TABLE "public"."movies_released_today" TO "anon";
GRANT ALL ON TABLE "public"."movies_released_today" TO "service_role";

GRANT ALL ON TABLE "public"."movies_without_images" TO "anon";
GRANT ALL ON TABLE "public"."movies_without_images" TO "authenticated";
GRANT ALL ON TABLE "public"."movies_without_images" TO "service_role";

GRANT ALL ON TABLE "public"."person_images" TO "authenticated";
GRANT ALL ON TABLE "public"."person_images" TO "anon";
GRANT ALL ON TABLE "public"."person_images" TO "service_role";

GRANT ALL ON SEQUENCE "public"."person_images_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."person_images_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."person_images_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."persons_aliases" TO "anon";
GRANT ALL ON TABLE "public"."persons_aliases" TO "authenticated";
GRANT ALL ON TABLE "public"."persons_aliases" TO "service_role";

GRANT ALL ON SEQUENCE "public"."persons_aliases_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."persons_aliases_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."persons_aliases_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."persons_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."persons_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."persons_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."role_permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."role_permissions" TO "anon";
GRANT ALL ON TABLE "public"."role_permissions" TO "service_role";

GRANT ALL ON SEQUENCE "public"."role_permissions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."role_permissions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."role_permissions_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."roles_by_age" TO "anon";
GRANT ALL ON TABLE "public"."roles_by_age" TO "authenticated";
GRANT ALL ON TABLE "public"."roles_by_age" TO "service_role";

GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."series_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."series_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."series_id_seq" TO "service_role";

GRANT ALL ON SEQUENCE "public"."studios_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."studios_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."studios_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "service_role";

GRANT ALL ON TABLE "public"."user_roles" TO "supabase_auth_admin";
GRANT ALL ON TABLE "public"."user_roles" TO "service_role";

GRANT ALL ON SEQUENCE "public"."user_roles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_roles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_roles_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;