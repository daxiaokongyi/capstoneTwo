const db = require('../db');
const {NotFoundError} = require('../expressError');

class Song {
    /** Find all songs 
    * Returns [{id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics}, ...]
    */

    static async findAll() {
        const result = await db.query(
            'SELECT id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics FROM songs'
        );
        return result.rows;
    }

    /** Given a song id, return data about song.
    *
    * Returns {id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics}
    *
    * Throws NotFoundError if not found.
    **/

    static async get(id) {
        const songResult = await db.query(
            'SELECT id, name, type, genreName, artistName, songUrl, durationMillis, releaseDate, albumname, composerName, artworkUrl, previewsUrl, hasLyrics FROM songs WHERE id = $1',
            [id]
        );
        // return not found errors if no such song is found
        if (songResult.rows.length === 0) throw new NotFoundError(`No such song with id ${id} was found`);
        return songResult.rows[0];
    }
}