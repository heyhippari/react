--
-- Test: Compute the age of a role when the role is created, 
-- a movie's release date is updated or deleted, and a person's
-- birthdate is updated or deleted.
--
-- This is a pgTAP test file. Run using `supabase db test`.
--
BEGIN;

SELECT
    plan (15);

-- Test 1: Check if the update_role_age_before_role_create function is present
SELECT
    has_function (
        'public',
        'update_role_age_before_role_create',
        ARRAY[]::TEXT[],
        'Function update_role_age_before_role_create should exist'
    );

-- Test 2: Check if the update_role_age_before_movie_update function is present
SELECT
    has_function (
        'public',
        'update_role_age_before_movie_update',
        ARRAY[]::TEXT[],
        'Function update_role_age_before_movie_update should exist'
    );

-- Test 3: Check if the update_role_age_before_person_update function is present
SELECT
    has_function (
        'public',
        'update_role_age_before_person_update',
        ARRAY[]::TEXT[],
        'Function update_role_age_before_person_update should exist'
    );

-- Test 4: Check if the update_role_age_before_role_create function returns a trigger
SELECT
    function_returns (
        'public',
        'update_role_age_before_role_create',
        'trigger',
        'Function update_role_age_before_role_create should return trigger'
    );

-- Test 5: Check if the update_role_age_before_movie_update function returns a trigger
SELECT
    function_returns (
        'public',
        'update_role_age_before_movie_update',
        'trigger',
        'Function update_role_age_before_movie_update should return trigger'
    );

-- Test 6: Check if the update_role_age_before_person_update function returns a trigger
SELECT
    function_returns (
        'public',
        'update_role_age_before_person_update',
        'trigger',
        'Function update_role_age_before_person_update should return trigger'
    );

-- Test 7: Check if the update_role_age_before_role_create trigger exists
SELECT
    has_trigger (
        'public',
        'roles',
        'update_role_age_before_role_create',
        'Trigger update_role_age_before_role_create should exist'
    );

-- Test 8: Check if the update_role_age_before_movie_update trigger exists
SELECT
    has_trigger (
        'public',
        'movies',
        'update_role_age_before_movie_update',
        'Trigger update_role_age_before_movie_update should exist'
    );

-- Test 9: Check if the update_role_age_before_person_update trigger exists
SELECT
    has_trigger (
        'public',
        'persons',
        'update_role_age_before_person_update',
        'Trigger update_role_age_before_person_update should exist'
    );

-- Test 10: Check if the update_role_age_before_role_create trigger calls the update_role_age_before_role_create function
SELECT
    trigger_is (
        'public',
        'roles',
        'update_role_age_before_role_create',
        'public',
        'update_role_age_before_role_create',
        'Trigger update_role_age_before_role_create should call function update_role_age_before_role_create'
    );

-- Test 11: Check if the update_role_age_before_movie_update trigger calls the update_role_age_before_movie_update function
SELECT
    trigger_is (
        'public',
        'movies',
        'update_role_age_before_movie_update',
        'public',
        'update_role_age_before_movie_update',
        'Trigger update_role_age_before_movie_update should call function update_role_age_before_movie_update'
    );

-- Test 12: Check if the update_role_age_before_person_update trigger calls the update_role_age_before_person_update function
SELECT
    trigger_is (
        'public',
        'persons',
        'update_role_age_before_person_update',
        'public',
        'update_role_age_before_person_update',
        'Trigger update_role_age_before_person_update should call function update_role_age_before_person_update'
    );

-- Test 13: Check if the creating a role triggers the update_role_age_before_role_create function
INSERT INTO
    public.movies (id, dvd_id, original_name, release_date)
VALUES
    (99999, 'ABC-123', 'The Matrix', '1999-03-31');

INSERT INTO
    public.persons (id, birth_date, original_name)
VALUES
    (99999, '1970-01-01', 'Keanu Reeves');

INSERT INTO
    public.roles (id, movie_id, person_id)
VALUES
    (99999, 99999, 99999);

SELECT
    IS (
        (
            SELECT
                age
            FROM
                public.roles
            WHERE
                id = 99999
        ),
        29::SMALLINT,
        'Creating a role should trigger the update_role_age_before_role_create function'
    );

-- Test 14: Check if updating a movie's release date triggers the update_role_age_after_movie_update function
UPDATE public.movies
SET
    release_date = '1995-03-31'
WHERE
    id = 99999;

SELECT
    IS (
        (
            SELECT
                age
            FROM
                public.roles
            WHERE
                id = 99999
        ),
        25::SMALLINT,
        'Updating a movie should trigger the update_role_age_after_movie_update function'
    );

-- Test 15: Check if updating a person's birth date triggers the update_role_age_after_person_update function
UPDATE public.persons
SET
    birth_date = '1964-09-02'
WHERE
    id = 99999;

SELECT
    IS (
        (
            SELECT
                age
            FROM
                public.roles
            WHERE
                id = 99999
        ),
        30::SMALLINT,
        'Updating a person should trigger the update_role_age_after_person_update function'
    );

ROLLBACK;