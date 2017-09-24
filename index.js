var request = require("request");

var command = process.argv[2];
//-----------------------------------------------------------------------------------------
const log4js = require('log4js');
log4js.configure({
  appenders: { kita: { type: 'file', filename: 'output.log' } },
  categories: { default: { appenders: ['kita'], level: 'info' } }
});

const logger = log4js.getLogger('kita');
logger.info('Hi');
//------------------------------------------------------------------------------------------
if (command == 'my-tweets') {


}
else if (command == 'spotify-this-song') {

}
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
      console.log("\n------------------- Movie Info -------------------" + "\n");
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log("The movie's release year is: " + JSON.parse(body).Year + "\n");
      console.log("------------------- Movie Info -------------------" + "\n");
    }
  });
}
else if (command == 'do-what-it-says') {

}


