INSERT INTO users (username, password, first_name, last_name, email, is_admin) 
VALUES ('jj',
        '123',
        'Jason',
        'Jin',
        'jj@gmail.com',
        TRUE
        ),
        ('th',
         '123',
         'Tom',
         'Hanks',
         'th@gmail.com',
         FALSE
        ), (
        'jb',
        '123',
        'James',
        'Blunt',
        'jb@gmail.com',
        FALSE
        );

-- INSERT INTO songs (song_id, song_name, artist_name, genre_name)
-- VALUES ('79029766', 'song1', 'artist1', 'ManPop'), ('1119072024', 'song2', 'artist2', 'ManPop'), ('538749492', 'song3', 'artist3', 'ManPop'), ('311325738', 'song4', 'artist4', 'ManPop'), ('1517801028', 'song5', 'artist5','ManPop');

INSERT INTO songs (song_id)
VALUES ('79029766'), ('1119072024'), ('538749492'), ('311325738'), ('1517801028');

INSERT INTO favorites (username, songs_id)
VALUES 
    ('jj', 1), 
    ('jj', 2),
    ('jj', 3),
    ('th', 1),
    ('th', 2),
    ('jb', 5),
    ('jb', 4);

-- INSERT INTO songs (id, name, types, artist_name, genre_names, duration_millis, release_date, album_name, composer_name, artwork_url, previews_url, hasLyrics)
-- VALUES (
--     "79029766",
--     "500 Miles",
--     "songs",
--     "The Journeymen",
--     ["Singer/Songwriter",
--      "Music",
--      "Traditional Folk",
--      "Folk-Rock",
--      "Contemporary Folk",
--      "Children's Music",
--      "Rock",
--      "Psychedelic"
--     ],
--     167813,
--     "1962-01-01",
--     "The Very Best of Peter, Paul and Mary",
--     "Hedy West",
--     "https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/ae/92/2b/ae922b24-7d22-eb75-0f2c-a48b49e43ee7/dj.uhhbdbuq.jpg/{w}x{h}bb.jpeg",
--     "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f6/3c/4b/f63c4bec-2428-05ad-56cf-20670bc163a0/mzaf_4522336002147735926.plus.aac.p.m4a",
--     TRUE
--     ),
--     (
--     "1443207925",
--     "Five Hundred Miles (Studio Version)",
--     "songs",
--     "The Kingston Trio",
--     [
--     "Folk",
--     "Music"
--     ],
--     183173,
--     "1995-08-12",
--     "The Capitol Years",
--     "Hedy West",
--     "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9d/dc/aa/9ddcaaf9-574d-7a8d-d871-410ac56cdc5e/00602557527964.rgb.jpg/{w}x{h}bb.jpeg",
--     "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/41/41/9b/41419b75-83f2-b06f-d092-715459419350/mzaf_17537783902227577519.plus.aac.p.m4a",
--     TRUE
-- );

