//Make spotify API return The Sign by Ace Of Bass when input is undefined
require("dotenv").config();

var keys = require("./keys");

//Import spotify API node package
var Spotify = require('node-spotify-api');

var fs = require("fs");

var moment = require("moment")

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret});
  
//Set process.argv equal to nodeArgs
var nodeArgs = process.argv
//Save the third argument in the node file to command variable
var command = nodeArgs[2]
//save the fourth arguement in the node file to input variable
var input = nodeArgs[3]


//Require axios
var axios = require("axios");

// node liri.js concert-this <artist/band name here>
function bandInTown(input) {
  if(input === undefined){
    console.log("Please enter a valid artist name")
  } else {
      axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
      function(response) {
        console.log(input + " will be playing at " + response.data[0].venue.name)
        console.log("The venue is located in " + response.data[0].venue.country)
        var momentDate = moment(response.data[0].datetime).format("MM/DD/YY")
        console.log("The show will happen on " + momentDate)
      } 
    )
  } 
}

// node liri.js spotify-this-song '<song name here>'
function spotifySong(input) {
  if(input === undefined){
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("----------------------------------------")
      console.log("The artist is " + data.tracks.items[0].artists[0].name)
      console.log("----------------------------------------")
      console.log("The song is " + input)
      console.log("Preview link: " + data.tracks.items[0].external_urls.spotify)
      console.log("This is featured on the album " + data.tracks.items[0].album.name)
    });
  } else {
    spotify.search({ type: 'track', query: input }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("----------------------------------------")
      console.log("The artist is " + data.tracks.items[0].artists[0].name)
      console.log("----------------------------------------")
      console.log("The song is " + input)
      console.log("Preview link: " + data.tracks.items[0].external_urls.spotify)
      console.log("This is featured on the album " + data.tracks.items[0].album.name)
    });
  }
}

// node liri.js movie-this '<movie name here>'
function movie(input) {
  if(input === undefined) {
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("----------------------------------------")
        console.log("Title: " + response.data.Title)
        console.log("----------------------------------------")
        console.log("The movie was released in " + response.data.Year + " with an IMDB rating of " + response.data.imdbRating)
        console.log("The Rotten Tomatoes rating is: " + response.data.Ratings[1].Value)
        console.log("The movie was produced in " + response.data.Country + ", with a language of " + response.data.Language)
        console.log("The movie's plot is " + response.data.Plot)
        console.log(response.data.Title + "is staring " + response.data.Actors)
      }
    );
  } else {
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
      function(response) {
        console.log("----------------------------------------")
        console.log("Title: " + response.data.Title)
        console.log("----------------------------------------")
        console.log("The movie was released in " + response.data.Year + " with an IMDB rating of " + response.data.imdbRating)
        console.log("The Rotten Tomatoes rating is: " + response.data.Ratings[1].Value) 
        console.log("The movie was produced in " + response.data.Country + ", with a language of " + response.data.Language)
        console.log("The movie's plot is " + response.data.Plot)
        console.log(response.data.Title + "is staring " + response.data.Actors)
      }
  )}
}
// node liri.js do-what-it-says
function doWhatItSays() {
  if(command === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
      var dataArr = data.split(",");
      if(dataArr.length === 2){
        whichCommand(dataArr[0], dataArr[1])
      } else if(dataArr.length === 1) {
        whichCommand(dataArr[0])
      }
    })
  }
}

function whichCommand(command, input) {
  switch (command) {
    case "concert-this":
      bandInTown(input);
      break;
    case "spotify-this-song":
      spotifySong(input);
      break;
    case "movie-this":
      movie(input);
      break;
    case "do-what-it-says":
      doWhatItSays(input);
      break;
    default: 
      console.log("Invalid entry")
  }
}

function runLiri(argOne, argTwo) {
  whichCommand(argOne, argTwo)
}

runLiri(command, input);