// const jsonschema = require('jsonschema');
const { default: axios } = require('axios');
const { Router } = require('express');
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
        const result = await axios.get(`${BASIC_API_URL}?term=${req.params.searchTerm}&limit=8`, {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
        const resultSongs = result.data.results.songs.data;
        const resultArtists = result.data.results.artists.data;
        const resultAlbums = result.data.results.albums.data;
        // const resultPlaylists = result.data.results.playlists.data;
        // const resultMusicVideos = result.data.results["music-videos"].data;


        console.log(`check albums data: ${JSON.stringify(resultAlbums)}`);
        console.log(`check artists data: ${JSON.stringify(resultArtists)}`);
        // console.log(`check playlists data: ${JSON.stringify(resultPlaylists)}`);
        // console.log(`check Music Videos data: ${JSON.stringify(resultMusicVideos)}`);

        resultSongs.map((song) => {
            console.log(`song route: ${song.id}`);
            console.log(`song name: ${song.attributes.name}`);
            console.log(`song artist name: ${song.attributes.artistName}`);
            console.log(`song genre name: ${song.attributes.genreNames[0]}`)

            Song.addSongToDatabase(song.id, song.attributes.name, song.attributes.artistName, song.attributes.genreNames[0]);
        });

        resultArtists.map(artist => ({
            artistUrl :artist.attributes.url,
            artistName : artist.attributes.name,
            artistGenreNames : artist.attributes.genreNames
        }));

        resultAlbums.map(album => ({
            albumUrl : album.attributes.url,
            albumArtist: album.attributes.artistName,
            albumName: album.attributes.name,
            albumReleaseDate: album.attributes.releaseDate
        }));

        // resultPlaylists.map(playlist => ({
        //     playlistUrl : playlist.attributes.url,
        //     playlistName: playlist.attributes.name,
        //     playlistDescription: playlist.attributes.description.standard
        // }));

        // resultMusicVideos.map(video => ({
        //     videoPreviewUrl : video.attributes.previews[0].url,
        //     videoHlsUrl : video.attributes.previews[0].hlsUrl,
        //     videoUrl : video.attributes.url,
        //     videoName: video.atrributes.name,
        //     videoDuration: video.atrributes.durationInMillis,
        //     videoReleaseDate: video.attributes.releaseDate
        // }));

        // console.log(result.data.results.songs.data);

        // return res.status(201).json({songs:resultSongs, artist: resultArtists, albums: resultAlbums, playlists: resultPlaylists, musicVideos: resultMusicVideos});

        return res.status(201).json({songs:resultSongs, artists: resultArtists, albums: resultAlbums});

    } catch (error) {
        return next(error);
    }
});

router.post("/checkfavorited/:songId", async function (req, res, next) {
    try {
        console.log(`check for favorited: ${JSON.stringify(req.body)}, and songID ${req.params.songId}`);
        const ifFavorited = await Song.checkIfFavorited(req.body.songsId, req.params.songId, req.body.username);
        console.log(`check if favorited: ${ifFavorited}`);
        console.log(`check if favorited: ${JSON.stringify(ifFavorited)}`);
        return res.json({favorited : ifFavorited});
    } catch (error) {
        return next(error);
    }
})

module.exports = router;