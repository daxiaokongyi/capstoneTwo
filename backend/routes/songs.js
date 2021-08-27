// const jsonschema = require('jsonschema');
const { default: axios } = require('axios');
const express = require('express'); 
const router = new express.Router();
const token = require('../getToken');
// const songSearchSchema = require('../schemas/songSearch.json');

// basic Apple API URL
const BASIC_API_URL = "https://api.music.apple.com/v1/catalog/us/search";

/** GET / Get songes with the category of songs
 */

router.get("/", async function (req, res, next) {
    try {
        console.log("it works!");
        const result = await axios.get(`${BASIC_API_URL}?term=jay+chou&limit=20`, {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        const resultSongs = result.data.results.songs.data;
        const nameSongs = resultSongs.map((song) => {
            return song.attributes.name;
        });
        console.log(result.data.results.songs.data);
        console.log(nameSongs);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;