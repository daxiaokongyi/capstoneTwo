"use strict"

const db = require('../db');
const {NotFoundError} = require('../expressError');

class Song {
    // Add songs fetched from API to song's database
    static async addSongToDatabase(songId, songName, songArtistName) {
        // check if the selected song is already in the song's database
        const songPreviewCheck = await db.query(
            `SELECT song_id
                FROM songs
                WHERE song_id = $1`,
                [songId],
        );

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
    }

    static async checkIfFavorited(songId, username) {
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

        songIdInFav = songIdInFav.rows.map(each => {
            return each.songs_id;
        })

        // check if the current song is user's favorite
        return songIdInFav.includes(songIdInDatabase);
    }
}

module.exports = Song;