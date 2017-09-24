var request = require("request");

var command = process.argv[2];
//-----------------------------------------------------------------------------------------
//instead of writing in a simple file I am trying to learn new feature
const log4js = require('log4js');
log4js.configure({
  appenders: { kita: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['kita'], level: 'info' } }
});

const logger = log4js.getLogger('kita');
//------------------------------------------------------------------------------------------
if (command == 'my-tweets') {


}
else if (command == 'spotify-this-song') {
  var Spotify = require('node-spotify-api');

  var spotify = new Spotify({
    id: <your spotify client id>,
   secret: <your spotify client secret>
        });

 spotify.search({type: 'track', query: 'All the Small Things' }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }

 console.log(data);
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


        }


