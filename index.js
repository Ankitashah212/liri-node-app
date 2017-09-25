var request = require("request");
var spotKey = require('./spot.js');
var keys = require("./keys.js");
var Twitter = require('twitter');

var fs = require("fs");
var cmd = require('node-run-cmd');
var command = process.argv[2];
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
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + " : " + tweets[i].text);
        logger.info(tweets[i].created_at + " : " + tweets[i].text);
      }
    }else{
      logger.fatal("twitter hates you");
    }
  });
}
else if (command == 'spotify-this-song') {

  //change query with argv[3]

  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    if (response.statusCode == 200) {
      console.log(data);
    } else {
      console.log("something went wrong");
    }

  });
}
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

      var movie = JSON.parse(body);
      // Parse the body of the site to obtain data
      //------------------------- write to console
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

      //-----------------------------write to log file

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
  });
}
else if (command == 'do-what-it-says') {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      throw error;
    }

    // We will then print the contents of data
    console.log(data);
    cmd.run(data);

  });
}


