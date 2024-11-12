--
-- This migration renames the functions and triggers that compute the age of a role
-- based on the birth date of the person and the release date of the movie.
-- The functions and triggers are renamed to have more descriptive names.
-- Along with this, it fixes implementation issues in the functions and triggers
-- that were brought to light by the pgTAP tests.
-- The functions and triggers are renamed as follows:
-- - update_role_age_create -> update_role_age_before_role_create
-- - update_role_age_movies -> update_role_age_after_movie_update
-- - update_role_age_persons -> update_role_age_before_person_update
--
-- Remove the old triggers and functions and create new ones with the updated names.
DROP TRIGGER if EXISTS "update_role_age_persons_trigger" ON "public"."persons";

DROP TRIGGER if EXISTS "update_role_age_create" ON "public"."roles";

DROP TRIGGER if EXISTS "update_role_age_after_movie_update" ON "public"."movies";

-- Rename the update_role_age_create function to update_role_age_before_role_create
DROP FUNCTION if EXISTS "public"."update_role_age_create" ();

CREATE FUNCTION "public"."update_role_age_before_role_create" () returns trigger language plpgsql
SET
    search_path TO '' AS $function$
BEGIN
  DECLARE
    movie_release_date date;
    person_birth_date date;
  BEGIN
    SELECT release_date INTO STRICT movie_release_date
    FROM public.movies
    WHERE id = NEW.movie_id;

    SELECT birth_date INTO STRICT person_birth_date
    FROM public.persons
    WHERE id = NEW.person_id;

    -- Calculate age using date arithmetic and set it directly on the NEW record
    NEW.age := EXTRACT(YEAR FROM AGE(movie_release_date, person_birth_date))::smallint;

    -- Return the modified NEW record which will be inserted
    RETURN NEW;
  END;
END;
$function$;

-- Rename the update_role_age_movies function to update_role_age_before_movie_update
DROP FUNCTION if EXISTS "public"."update_role_age_movies" ();

CREATE FUNCTION "public"."update_role_age_before_movie_update" () returns trigger language plpgsql
SET
    search_path TO '' AS $function$
BEGIN
    -- Since this is a BEFORE trigger, we want to update the ages
    -- before the movie record is updated
    WITH roles_to_update AS (
        SELECT 
            r.id AS role_id,
            EXTRACT(YEAR FROM AGE(NEW.release_date, p.birth_date))::SMALLINT AS new_age
        FROM public.roles r
        JOIN public.persons p ON p.id = r.person_id
        WHERE r.movie_id = NEW.id
    )
    UPDATE public.roles r
    SET age = rtu.new_age
    FROM roles_to_update rtu
    WHERE r.id = rtu.role_id;

    RETURN NEW;
END;
$function$;

-- Rename the update_role_age_persons function to update_role_age_before_person_update
DROP FUNCTION if EXISTS "public"."update_role_age_persons" ();

CREATE FUNCTION "public"."update_role_age_before_person_update" () returns trigger language plpgsql AS $function$
BEGIN
    -- Since this is a BEFORE trigger, we want to update the ages
    -- before the person record is updated
    WITH roles_to_update AS (
        SELECT 
            r.id AS role_id,
            EXTRACT(YEAR FROM AGE(m.release_date, NEW.birth_date))::SMALLINT AS new_age
        FROM public.roles r
        JOIN public.movies m ON m.id = r.movie_id
        WHERE r.person_id = NEW.id
          AND NEW.birth_date IS NOT NULL
          AND m.release_date IS NOT NULL
    )
    UPDATE public.roles r
    SET age = rtu.new_age
    FROM roles_to_update rtu
    WHERE r.id = rtu.role_id;

    RETURN NEW;
END;
$function$;

-- Rename the update_role_age_persons_trigger trigger to update_role_age_before_person_update
CREATE TRIGGER "update_role_age_before_person_update" before
UPDATE of "birth_date" ON "public"."persons" FOR each ROW WHEN (old.birth_date IS DISTINCT FROM new.birth_date)
EXECUTE function "public"."update_role_age_before_person_update" ();

-- Rename the update_role_age_create trigger to update_role_age_before_role_create
CREATE TRIGGER "update_role_age_before_role_create" before insert ON "public"."roles" FOR each ROW
EXECUTE function "public"."update_role_age_before_role_create" ();

-- Re-create the update_role_age_before_movie_update trigger
CREATE TRIGGER "update_role_age_before_movie_update" before
UPDATE of "release_date" ON "public"."movies" FOR each ROW WHEN (
    old.release_date IS DISTINCT FROM new.release_date
)
EXECUTE function "public"."update_role_age_before_movie_update" ();
