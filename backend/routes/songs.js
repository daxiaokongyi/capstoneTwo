// const jsonschema = require('jsonschema');
const { default: axios } = require('axios');
const express = require('express'); 
const router = new express.Router();
const token = require('../getToken');
const Song = require('../models/songs');
// const songSearchSchema = require('../schemas/songSearch.json');

// basic Apple API URL
const BASIC_API_URL = "https://api.music.apple.com/v1/catalog/us/search";

/** GET / Get songes with the category of songs
 */

router.get("/:searchTerm", async function (req, res, next) {
    try {
        console.log("it works!");
        console.log(`search term: ${req.params.searchTerm}`)
        const result = await axios.get(`${BASIC_API_URL}?term=${req.params.searchTerm}&limit=5`, {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        const resultSongs = result.data.results.songs.data;

        resultSongs.map((song) => {
            console.log(`song route: ${song.id}`);
            console.log(`song route: ${song.attributes.name}`);
            console.log(`song route: ${song.attributes.artistName}`);

            Song.addSongToDatabase(song.id, song.attributes.name, song.attributes.artistName);
        });

        // console.log(result.data.results.songs.data);



        return res.status(201).json({songs:resultSongs});
    } catch (error) {
        return next(error);
    }
});

module.exports = router;