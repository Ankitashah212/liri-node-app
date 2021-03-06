// Declare your constants
const request = require("request");
const Spotify = require('node-spotify-api');
const spotKey = require('./spot.js');
const keys = require("./keys.js");
const Twitter = require('twitter');
const fs = require("fs");
const cmd = require('node-cmd');
const shell = require('shelljs');
const inquirer = require("inquirer");
const fileForCommand = "random.txt";
const filename = "output.log";

//-----------------------------------------------------------------------------------------
//instead of writing in a simple file I am trying to learn new feature
const log4js = require('log4js');
log4js.configure({
  appenders: { kita: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['kita'], level: 'info' } }
});

//logger object to log output
const logger = log4js.getLogger('kita');
//------------------------------------------------------------------------------------------
//mi functions
//-----------------------------------------------------------------------------------------

//------------------------- write to movie data to console
function printMovieData(movie) {
  console.log("\n------------------- Movie Info -------------------" + "\n");
  console.log("Title: " + movie.Title);
  console.log("IMDB Rating: " + movie.imdbRating);
  console.log("Plot: " + movie.Plot);
  console.log("Language: " + movie.Language);
  console.log("Actors: " + movie.Actors);
  console.log("Country: " + movie.Country);
  if (movie.hasOwnProperty("Ratings")) {

    console.log("Rotten Tomatoes rating: " + movie.Ratings[1].Value);
  }
  console.log("Release Year: " + movie.Year + "\n");
  console.log("------------------- Movie Info -------------------" + "\n");
}

// logging movie info to logger

function logMovieInfo(movie) {

  logger.info("\n------------------- Movie Info -------------------" + "\n");
  logger.info("Title: " + movie.Title);
  logger.info("IMDB Rating: " + movie.imdbRating);
  logger.info("Plot: " + movie.Plot);
  logger.info("Language: " + movie.Language);
  logger.info("Actors: " + movie.Actors);
  logger.info("Country: " + movie.Country);
  if (movie.hasOwnProperty("Ratings")) {

    logger.info("Rotten Tomatoes rating: " + movie.Ratings[1].Value);
  }
  logger.info("Release Year: " + movie.Year + "\n");
  logger.info("------------------- Movie Info -------------------" + "\n");

}

// write tweets to file and console

function writeTweets(tweets) {
  console.log("------------------- Tweets -------------------");
  for (let i = 0; i < tweets.length; i++) {
    // log tweets
    console.log(tweets[i].created_at + " : " + tweets[i].text);
    logger.info(tweets[i].created_at + " : " + tweets[i].text);
  }
  console.log("------------------- Tweets -------------------");
}

function doTheTweetyThingy(input) {

  //creating and using a twitter client object
  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  //fetch tweets for username 
  var params = { screen_name: input, count: 20 };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      writeTweets(tweets);
    } else {
      logger.fatal("twitter hates you");
    }
  });
}



function executeCommandOnShell(fileName) {
  //read file and ecexute first line
  fs.readFile(fileName, "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      throw error;
    }
    // We will then print the contents of data
    // This is the way I understood the project, instead of calling one of the functions
    // I want to execute it from shell. 
    console.log(data);
    if (shell.exec(data).code !== 0) {
      shell.echo('failed');
      shell.exit(1);
    }
  });
}



// Soptify print song info for first 3 songs
function printSpotifyData(data, songName) {
  //  -------------------------------------------------------------------
  var max = 3;
  if (data.tracks.length < max) {
    max = data.tracks.length;
  }
  for (var i = 0; i < max; i++) {
    console.log("\nsong info record number " + (i + 1) + "----------------------");
    console.log("Artist Name " + data.tracks.items[i].album.artists[0].name);
    console.log("Preview Link " + data.tracks.items[i].preview_url);
    console.log("Song Name " + songName);
    console.log("Album Name " + data.tracks.items[i].album.name);
    console.log("song info ----------------------------------------------\n");
  }
}
function logSpoityData(data, songName) {
  var max = 3;
  if (data.tracks.length < max) {
    max = data.tracks.length;
  }
  for (var i = 0; i < max; i++) {
    //  -------------------------------------------------------------------
    logger.info("\nsong info record number " + (i + 1) + "----------------------");
    logger.info("Artist Name " + data.tracks.items[i].album.artists[0].name);
    logger.info("Preview Link " + data.tracks.items[i].preview_url);
    logger.info("Song Name " + songName);
    logger.info("Album Name " + data.tracks.items[i].album.name);
    logger.info("song info ----------------------------------------------\n");
  }
}

function processSpotifyRequest(song) {

  if (song.length == 0) {
    song = "when you believe";
  }

  var spotify = new Spotify({
    id: spotKey.id,
    secret: spotKey.secret
  });
  // look into response
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {

      printSpotifyData(data, song);
      logSpoityData(data, song);
    }

  });
}

function processOMDBRequest(name) {
  // replace spaces and everything else that bothers a URL with more acceptable characters
  if (name.length == 0) {
    name = "Beauty and the beast";
  }
  name = encodeURIComponent(name);
  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function (error, response, body) {
    if (error) {
      throw error;
    }
    // If the request is successful (i.e. if the response status code is 200)
    if (response.statusCode === 200) {
      // Parse the body of the site to obtain data
      var movie = JSON.parse(body);
      //------------------------- write to console
      printMovieData(movie);
      //-----------------------------write to log file
      logMovieInfo(movie);
    }
  });
}

function doWhatItSays() {
  fs.readFile(fileForCommand, "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      throw error;
    }
    var dataArray = data.split(" ");
// first argument in file is always command and second is input for command
    if (dataArray[0] == "my-tweets") {
      doTheTweetyThingy(dataArray[1]);
    }
    else if (dataArray[0] == "spotify-this-song") {
      processSpotifyRequest(dataArray[1]);
    }
    else if (dataArray[0] == "movie-this") {
      processOMDBRequest(dataArray[1]);
    }

  });
}
//-----------------------------------------------------------------------------------------
// inquirer
//--------------------------------------------------------------------------------------

inquirer
  .prompt([

    // Here we give the user a list of commands to choose from.
    {
      type: "list",
      message: "Your Wish is my Command, So choose one",
      choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "command"
    },
    {
      type: "input",
      message: "Please enter a user input if you wish \n or hit enter",
      name: "input"
    },

  ])
  .then(function (inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.

    //me options
    //-------------------------------------------------------------------------------------
    // if tweeter selected
    if (inquirerResponse.command == 'my-tweets') {
      doTheTweetyThingy(inquirerResponse.input);
    }
    //-------------------------------------------spitify---------------------------
    else if (inquirerResponse.command == 'spotify-this-song') {
      processSpotifyRequest(inquirerResponse.input);
    }
    //---------------------------------------------------------------------------------------
    // OMBD portion
    else if (inquirerResponse.command == 'movie-this') {
      processOMDBRequest(inquirerResponse.input);
    }
    //--------------------------------------------------------------------------------------
    // running commands from js fie
    else if (inquirerResponse.command == 'do-what-it-says') {
      // this became obsolete as I did prompt, would have been cool though :(
      //executeCommandOnShell(fileForCommand);
      doWhatItSays();
    }

  });

