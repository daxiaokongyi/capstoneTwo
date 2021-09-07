"use strict"

const db = require('../db');
const {NotFoundError} = require('../expressError');

class Song {
    // Add songs fetched from API to song's database
    static async addSongToDatabase(songId, songName, artistName) {
        console.log(`check in song's model: ${songId}, ${songName}, ${artistName}`);

        // check if the selected song is already in the song's database
        const songPreviewCheck = await db.query(
            `SELECT song_id
                FROM songs
                WHERE song_id = $1`,
                [songId],
        );

        console.log(songPreviewCheck.rows[0]);

        if (!songPreviewCheck.rows[0]) {
            const result = await db.query(
                `INSERT INTO songs
                (song_id, song_name, artist_name)
                VALUES ($1, $2, $3)
                RETURNING
                    song_id AS "songId",
                    song_name AS "songName",
                    artist_name AS "artistName"`,
                [songId, songName, artistName],
            );
        }

        // const songs = result.rows[0];
        // return songs;
        return;
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