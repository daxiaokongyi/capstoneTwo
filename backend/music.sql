\echo 'Delete and recreate music db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE music;
CREATE DATABASE music;
\connect music

\i music-schema.sql
-- \i music-seed.sql

-- \echo 'Delete and recreate music_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE music_test;
-- CREATE DATABASE music_test;
-- \connect music_test

-- \i music-schema.sql