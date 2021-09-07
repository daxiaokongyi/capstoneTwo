CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK(position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    song_id INTEGER NOT NULL,
    song_name TEXT NOT NULL,
    artist_name TEXT NOT NULL
);

CREATE TABLE favorites (
    username VARCHAR(25) 
        REFERENCES users ON DELETE CASCADE,
    songs_id INTEGER 
        REFERENCES songs ON DELETE CASCADE,
    PRIMARY KEY (username, songs_id)
);


-- CREATE TABLE artist (
--     id TEXT PRIMARY KEY,
--     name TEXT NOT NULL,
--     type TEXT NOT NULL,
--     genre_names TEXT NOT NULL,
--     artist_url TEXT NOT NULL
-- )

-- CREATE TABLE songs (
--     id TEXT PRIMARY KEY,
--     name TEXT NOT NULL,
--     type TEXT NOT NULL,
--     genre_names TEXT NOT NULL,
--     artist_name TEXT NOT NULL,
--     song_url TEXT NOT NULL,
--     duration_millis INTEGER NOT NULL,
--     release_date TEXT NOT NULL,
--     album_name TEXT NOT NULL,
--     composer_name TEXT NOT NULL,
--     artwork_url TEXT NOT NULL,
--     previews_url TEXT,
--     has_lyrics BOOLEAN DEFAULT FALSE,
-- )

-- CREATE TABLE albums (
--     id TEXT NOT NULL,
--     name TEXT NOT NULL,
--     type TEXT NOT NULL,
--     genre_names TEXT NOT NULL
--     artwork_url TEXT NOT NULL,
--     release_date TEXT NOT NULL,
-- )

-- CREATE TABLE music-videos (
--     id TEXT NOT NULL,
--     name TEXT NOT NULL,
--     type TEXT NOT NULL,
--     url TEXT NOT null, 
--     previews_url TEXT,
--     previews_artwork_url TEXT,
--     artwork_url TEXT NOT NULL,
--     artist_name TEXT NOT NULL,
--     genre_names TEXT NOT NULL
--     duration_millis INTEGER NOT NULL,
--     has_4k BOOLEAN DEFAULT FALSE,
--     has_HDR BOOLEAN DEFAULT FALSE
-- )



