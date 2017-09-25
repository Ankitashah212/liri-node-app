var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '07305e5036874c8c9743d6aa837bef49',
    secret: '07305e5036874c8c9743d6aa837bef49'
});



    module.exports = spotify;
    console.log("done spotify");

    /*
var spotify = new Spotify({
    id: '07305e5036874c8c9743d6aa837bef49',
    secret: '07305e5036874c8c9743d6aa837bef49'
  });

  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  });

    */