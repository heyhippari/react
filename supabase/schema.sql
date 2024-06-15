
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

CREATE TYPE "public"."image_type" AS ENUM (
    'front_cover',
    'full_cover',
    'art',
    'disc',
    'logo',
    'screenshot'
);

ALTER TYPE "public"."image_type" OWNER TO "postgres";

COMMENT ON TYPE "public"."image_type" IS 'Types of images for various entities';

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
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
    "create_time" timestamp with time zone NOT NULL,
    "update_time" timestamp with time zone NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL,
    "thumb_url" character varying,
    "art_url" character varying,
    "birth_date" timestamp with time zone
);

ALTER TABLE "public"."persons" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."persons_movies_count"("public"."persons") RETURNS bigint
    LANGUAGE "sql" STABLE
    AS $_$
  select count(*) from roles where person_id = $1.id;
$_$;

ALTER FUNCTION "public"."persons_movies_count"("public"."persons") OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."series" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone NOT NULL,
    "update_time" timestamp with time zone NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL
);

ALTER TABLE "public"."series" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."series_movies_count"("public"."series") RETURNS bigint
    LANGUAGE "sql" STABLE
    AS $_$
  select count(*) from movies where series_id = $1.id;
$_$;

ALTER FUNCTION "public"."series_movies_count"("public"."series") OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."studios" (
    "id" bigint NOT NULL,
    "create_time" timestamp with time zone NOT NULL,
    "update_time" timestamp with time zone NOT NULL,
    "name" character varying,
    "original_name" character varying NOT NULL
);

ALTER TABLE "public"."studios" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."studio_movies_count"("public"."studios") RETURNS bigint
    LANGUAGE "sql" STABLE
    AS $_$
  select count(*) from movies where studio_id = $1.id;
$_$;

ALTER FUNCTION "public"."studio_movies_count"("public"."studios") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_role_age_create"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  DECLARE
    movie_record RECORD;
    person_record RECORD;
    new_age INT;
  BEGIN
    SELECT * INTO movie_record
    FROM movies
    WHERE movies.id = NEW.movie_id;

    SELECT * INTO person_record
    FROM persons
    WHERE persons.id = NEW.person_id;

    -- Calculate age using date arithmetic
    new_age := EXTRACT(YEAR FROM AGE(movie_record.release_date, person_record.birth_date));

    UPDATE roles
    SET age = new_age
    WHERE id = NEW.id;

    RETURN NEW;
  END;
END;$$;

ALTER FUNCTION "public"."update_role_age_create"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_role_age_movies"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE roles 
    SET age = EXTRACT(YEAR FROM AGE(NEW.release_date, persons.birth_date))
    FROM persons
    WHERE roles.movie_id = NEW.id AND roles.person_id = persons.id;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_role_age_movies"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_role_age_persons"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE roles 
    SET age = EXTRACT(YEAR FROM AGE(movies.release_date, NEW.birth_date))
    FROM movies
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
    "create_time" timestamp with time zone NOT NULL,
    "update_time" timestamp with time zone NOT NULL,
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
    "create_time" timestamp with time zone NOT NULL,
    "update_time" timestamp with time zone NOT NULL,
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

CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" bigint NOT NULL,
    "age" smallint,
    "movie_id" bigint NOT NULL,
    "person_id" bigint NOT NULL
);

ALTER TABLE "public"."roles" OWNER TO "postgres";

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

ALTER TABLE ONLY "public"."persons"
    ADD CONSTRAINT "persons_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."series"
    ADD CONSTRAINT "series_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."studios"
    ADD CONSTRAINT "studios_pkey" PRIMARY KEY ("id");

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

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_movies_movie" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_persons_person" FOREIGN KEY ("person_id") REFERENCES "public"."persons"("id");

CREATE POLICY "Enable read access for all users" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."images" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."jobs" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."labels" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."movie_images" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."movies" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."persons" FOR SELECT USING (true);

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

ALTER TABLE "public"."persons" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."series" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."studios" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."tags" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."persons" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."persons" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."series" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."series" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."studios" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."studios" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."categories" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."categories" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."images" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."images" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."jobs" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."jobs" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."labels" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."labels" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."movie_images" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."movie_images" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."movies" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."movies" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."profiles" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."profiles" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."roles" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."roles" TO "anon";

GRANT SELECT,INSERT,UPDATE ON TABLE "public"."tags" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "public"."tags" TO "anon";

RESET ALL;
