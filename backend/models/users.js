"use strict"

const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');
const {sqlForPartialUpdate} = require('../helpers/sql');
const {UnauthorizedError,
       BadRequestError, 
       NotFoundError
} = require('../expressError');


/** create a class with function for users */
class User {
    /** authenticate user with username and password
     * returns an object with keys of username, first_name, last_name, email, and is_admin
     * throw unauthorized error if no user found or password is incorrect
     */
    static async authenticate(username, password) {
        // try to see if user can be found
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        )

        // get user from result
        const user = result.rows[0];
        
        // check password if user is found

        if (user) {
            console.log(`check if user exists: ${user.username}, ${user.password}, ${user.email}`);

            // compare hashed password to a new hashed one from input password
            const isValid = await bcrypt.compare(password, user.password);
            console.log(`password: ${password}, user.password: ${user.password}`);
            console.log(`test isValid: ${isValid}`);
            if (isValid === true) {
                // "hide" user's hashed password before returning the current user's infomation 
                delete user.password;
                return user;
            }
        }

        // if user is not found or password is invalid, throw unauthorized errors
        throw new UnauthorizedError("Invalid username/password");
    }

    /** Sign up user with data required
     * return an object with keys of username, first_name, last_name, email, and isAdmin
     * throw bad request error when username is duplicates
     */
    static async signup({username, password, firstName, lastName, email, isAdmin}) {
        // check if duplicate is true or not
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        )

        // return bad request error if duplicate of username was found
        if(duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        // if user name is valid, hash the input password
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        // insert the new user into the database
        const result = await db.query(
            `INSERT INTO users
                (username,
                password,
                first_name,
                last_name,
                email,
                is_admin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
                username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                email,
                isAdmin
            ],
        );

        // get and return new user with returning user info from database
        const user = result.rows[0];
        return user;
    }

    /** Find all users
     * returns an array with object elements of users
     */

    static async findAll () {
        const result = await db.query (
            `SELECT 
                username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"
            FROM users
            ORDER BY username`
        );

        return result.rows;
    }

    /** get detail of given username
    * return {username, first_name, last_name, email, is_admin} 
    * where songs is the favorite of the given user
    */

    static async get(username) {
        const userResult = await db.query(
            `SELECT 
                username,
                first_name AS "firstName",  
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
            [username]
        );

        const user = userResult.rows[0];

        // check if user is found
        if (!user) throw new NotFoundError(`No user ${username} was found`);

        // get all existing user's favourite songs
        const userSongsResult = await db.query(
            `SELECT f.songs_id
             FROM favorites AS f
             WHERE f.username = $1`,
             [username]
        ) 

        console.log(userSongsResult.rows);

        if (userSongsResult.rows.length !== 0) {
            console.log(userSongsResult.rows[0]);

            const songsId = userSongsResult.rows.map(each => {
                console.log(`type of ${typeof parseInt(each.songs_id)}`);
                return parseInt(each.songs_id);
            })

            console.log(`songsId: ${songsId}`);
            console.log(`type: `)

            // const favoritedSongId = await db.query(
            //     `SELECT s.song_id
            //     FROM songs AS s
            //     WHERE s.id = $1`,
            //     [id]
            // )

            const favDetails = await db.query(
                `SELECT song_id
                 FROM songs
                 WHERE id in (${songsId})`
            )

            console.log(`check favorite details: ${JSON.stringify(favDetails.rows)}`);

            // user.favoriteSongs = favDetails.rows.map(
            //     each => {
            //         return {
            //             songId : each.song_id,
            //             songName : each.song_name,
            //             songArtist: each.artist_name
            //         }
            //     }
            // )

            user.favoriteSongs = favDetails.rows.map(
                each => [each.song_id, each.song_name, each.artist_name, each.genre_name]
            )
        } else {
            user.favoriteSongs = [];
        }

        console.log(JSON.stringify( user.favoriteSongs));

        // assign user's favorite songs from database
        // user.favoriteSongs = userSongsResult.rows.map(f => f.songs_id);

        console.log(JSON.stringify(user));
        return user;
    }

    /** Update user's data
     * data that can be editted is firstName, lastName, password, email, isAdmin
     * data return are username, firstName, lastName, email, isAdmin
     * return not found error is no user can be found
     * update is for partial
     * 
     */

    static async update(username, data) {
        // hash the input password
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        console.log(`psql~~~~~~~~~ ${username}, ${JSON.stringify(data)}`);

        const {setCols, values} = sqlForPartialUpdate(
            data, 
            {
                firstName : "first_name",
                lastName : "last_name",
                isAdmin : "is_admin",
            }); 

        console.log(`check setCols: ${setCols}`);
        console.log(`check values: ${values}`);

        // const usernameVarIdx = `$${values.length + 1}`;
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                            SET ${setCols}
                            WHERE username = ${usernameVarIdx}
                            RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
        console.log(querySql);
        // update the data in the database
        const result = await db.query(querySql, [...values, username]);
        // return the updated user
        const user = result.rows[0];

        // check if user exists
        if(!user) throw new NotFoundError(`No user ${username} found`);

        delete user.password;
        return user;
    }

    /** Delete given user from database */
    static async remove(username) {
        let result = await db.query(
            `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
            [username],
        );

        const user = result.rows[0];

        // return not found error if no given username
        if(!user) throw new NotFoundError(`No user ${username} found`);
    }

    /** set songs as user's favorite */

    static async setFavorite(username, songId) {
        console.log(`set song favorite ${username}, ${songId}`);
        // get user based on the username given
        const usernameSelected = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`, 
            [username]
        );
        // check if this user can be found
        const user = usernameSelected.rows[0];
        if (!user) throw new NotFoundError(`No username ${username} found`);

        // get song based on its song_id
        const songSelected = await db.query(
            `SELECT id
            FROM songs
            WHERE song_id = $1`,
            [songId]
        );
        // check if this song can be found
        const song = songSelected.rows[0];
        console.log(`check song's id in the model, ${song}`);
        console.log(`check song's id in the model, ${JSON.stringify(song)}`);

        if (!song) throw new NotFoundError(`No song with ID of ${songId} found`);

        // console.log(favoritesInUser.rows);

        // set this song to be user's favorite
        await db.query(
            `INSERT INTO favorites (username, songs_id)
            VALUES ($1, $2)`,
            [username, song.id]
        );
    } 

    static async deleteFavorite(username, songId) {
        console.log(`set song favorite ${username}, ${songId}`);
        // get user based on the username given
        const usernameSelected = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`, 
            [username]
        );
        // check if this user can be found
        const user = usernameSelected.rows[0];
        if (!user) throw new NotFoundError(`No username ${username} found`);

        // get song based on its song_id
        const songSelected = await db.query(
            `SELECT id
            FROM songs
            WHERE song_id = $1`,
            [songId]
        );
        // check if this song can be found
        const song = songSelected.rows[0];
        console.log(`check song's id in the model, ${song}`);
        console.log(`check song's id in the model, ${JSON.stringify(song)}`);

        if (!song) throw new NotFoundError(`No song with ID of ${songId} found`);

        // remove this song from user's favorite
        const songDeleted = await db.query(
            `DELETE 
             FROM favorites
             WHERE username = $1
             AND songs_id = $2
             RETURNING $3`,
             [username, song.id, songId]
        )

        if (!songDeleted) throw new NotFoundError(`No song with id of ${songId} was found`);

        return song.id;
    }
}

module.exports = User;