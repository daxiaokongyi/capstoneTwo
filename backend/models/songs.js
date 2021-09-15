"use strict"

const db = require('../db');
const {NotFoundError} = require('../expressError');

class Song {
    // // Add songs fetched from API to song's database
    // static async addSongToDatabase(songId, songName, artistName, genreName) {
    //     console.log(`check in song's model: ${songId}, ${songName}, ${artistName}, ${genreName}`);

    //     // check if the selected song is already in the song's database
    //     const songPreviewCheck = await db.query(
    //         `SELECT song_id
    //             FROM songs
    //             WHERE song_id = $1`,
    //             [songId],
    //     );

    //     console.log(songPreviewCheck.rows[0]);

    //     if (!songPreviewCheck.rows[0]) {
    //         await db.query(
    //             `INSERT INTO songs
    //             (song_id, song_name, artist_name, genre_name)
    //             VALUES ($1, $2, $3, $4)
    //             RETURNING
    //                 song_id AS "songId",
    //                 song_name AS "songName",
    //                 artist_name AS "artistName",
    //                 genre_name AS "genreName"`,
    //             [songId, songName, artistName, genreName],
    //         );
    //     }

    //     // const songs = result.rows[0];
    //     // return songs;
    //     return;
    // }

    // Add songs fetched from API to song's database
    static async addSongToDatabase(songId, songName, songArtistName) {
        console.log(`check in song's model: ${songId}`);

        // check if the selected song is already in the song's database
        const songPreviewCheck = await db.query(
            `SELECT song_id
                FROM songs
                WHERE song_id = $1`,
                [songId],
        );

        console.log(songPreviewCheck.rows[0]);

        if (songPreviewCheck.rows.length === 0) {
            await db.query(
                `INSERT INTO songs
                (song_id, song_name, song_artist)
                VALUES ($1, $2, $3)
                RETURNING
                    song_id AS "songId",
                    song_name AS "songName",
                    song_artist AS "songArtistName"`,
                [songId, songName, songArtistName],
            );
        } else {
            return;
        }
        // const songs = result.rows[0];
        // return songs;
    }

    static async checkIfFavorited(songId, username) {
        console.log(`check username: ${username}, song Id: ${songId}`);

        let songIdInDatabase = await db.query(
            `SELECT id
             FROM songs
             WHERE song_id = $1`,
             [songId]
        )

        // check if this song is in a favorited list
        if (songIdInDatabase.rows.length === 0) {
            return false;
        }

        songIdInDatabase = songIdInDatabase.rows[0].id;

        let songIdInFav = await db.query(
            `SELECT songs_id
             FROM favorites
             WHERE username = $1`,
            [username]
        )

        console.log(`fav song id: ${songIdInFav.rows}`);

        songIdInFav = songIdInFav.rows.map(each => {
            console.log(each.songs_id);
            return each.songs_id;
        })

        console.log(`songIdInFav array ids: ${songIdInFav}`);
        console.log(`songIdInDatabase id: ${songIdInDatabase}`);

        // check if the current song is user's favorite
        console.log(songIdInFav.includes(songIdInDatabase));
        return songIdInFav.includes(songIdInDatabase);

        // console.log(JSON.stringify(songIdInDatabase));

        // console.log(`check the length of song ids in db: ${length(songIdInDatabase.rows)}`);

        console.log(`song id in database: ${songIdInDatabase.rows[0].id}`);
        // console.log(`fav song id: ${JSON.stringify(songIdInFav.rows)}`)


        if (songIdInDatabase.rows.length !== 0 && songIdInFav.rows.length !==0) {
            return true;
        } else {
            return false;
        } 

        // if (Object.keys(songIdInDatabase.rows[0]).length === 0) throw new NotFoundError(`No song with ID ${songId} was found`);

        // const songIdInFavorite = await db.query(
        //     `SELECT songs_id AS "songsId"
        //      FROM favorites
        //      WHERE songs_id = $1
        //      AND username = $2
        //     `,
        //     [songIdInDatabase.rows[0].id, username]
        // ) 

        // console.log(`check if no song is found in favorites: ${JSON.stringify(songIdInFavorite.rows)}`);
        // console.log(`check if no song is found in favorites: ${songIdInFavorite.rows}`);


        // if (songIdInFavorite.rows.length !== 0) {
        //     console.log(`check if song is saved in the favorited: ${songIdInFavorite.rows[0].songsId}`);
        // } 

        // console.log(`favorited song is found: ${songIdInFavorite.rows.length !== 0}`);

        // return songIdInFavorite.rows.length !== 0 ? true : false;
    }

    // Add a selected song to user's favorite list



    // /** Find all songs 
    // * Returns [{id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics}, ...]
    // */

    // static async findAll() {
    //     const result = await db.query(
    //         'SELECT id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics FROM songs'
    //     );
    //     return result.rows;
    // }

    // /** Given a song id, return data about song.
    // *
    // * Returns {id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics}
    // *
    // * Throws NotFoundError if not found.
    // **/

    // static async get(id) {
    //     const songResult = await db.query(
    //         'SELECT id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics FROM songs WHERE id = $1',
    //         [id]
    //     );
    //     // return not found errors if no such song is found
    //     if (songResult.rows.length === 0) throw new NotFoundError(`No such song with id ${id} was found`);
    //     return songResult.rows[0];
    // }
}

module.exports = Song;