// Declare your constants
const request = require("request");
const Spotify = require('node-spotify-api');
const spotKey = require('./spot.js');
const keys = require("./keys.js");
const Twitter = require('twitter');
const fs = require("fs");
const cmd = require('node-cmd');
const shell = require('shelljs');
const command = process.argv[2];
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

function printMovieData(movie) {
  //------------------------- write to movie data to console
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

function logMovieInfo(movie) {
  // logging movie info to logger
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


// if tweeter selected
if (command == 'my-tweets') {

  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  var params = { screen_name: 'ankitashah212', count: 20 };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // console.log("Success");
      console.log("------------------- Tweets -------------------");
      for (let i = 0; i < tweets.length; i++) {
        // log tweets
        console.log(tweets[i].created_at + " : " + tweets[i].text);
        logger.info(tweets[i].created_at + " : " + tweets[i].text);
      }
      console.log("------------------- Tweets -------------------");
    } else {
      logger.fatal("twitter hates you");
    }
  });
}

//-------------------------------------------spitify---------------------------
else if (command == 'spotify-this-song') {

  //change query with argv[3]
  var spotify = new Spotify({
    id: spotKey.id,
    secret: spotKey.secret
  });

  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {

      console.log(data.tracks.items[0]);
    }

  });
}

//---------------------------------------------------------------------------------------
// OMBD portion
else if (command == 'movie-this') {
  var movieName = process.argv[3];

  // replace spaces and everything else that bothers a URL with more acceptable characters
  movieName = encodeURIComponent(movieName);;

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
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
//--------------------------------------------------------------------------------------
// running commands from js fie
else if (command == 'do-what-it-says') {

  fs.readFile("random.txt", "utf8", function (error, data) {

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


