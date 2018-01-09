require("dotenv").config();
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var choice = process.argv[2];
var variableValue = process.argv[3];



 if(choice === 'my-tweets'){
 	 //tweets
var client = new Twitter(keys.twitter);
 

var params = {screen_name: 'Paul Schaller', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
    	  var twitterTweets = 
    	  	"Screen Name:  " + tweets[i].user.screen_name + "\n" + 
	        "text:  " + tweets[i].text + "\n" + 
	        "Date Created:  " + tweets[i].created_at + "\n" + 
	        "Tweet #" + i + "\n";
	       console.log(twitterTweets);
	       log(twitterTweets);
	    }
  } else {
  	console.log("Error:" + error);
  	return;
  }
});
}





if(choice === 'spotify-this-song'){ 

	var song = new Spotify(keys.spotify);
	// Spotify function, uses the Spotify module to call the Spotify api
		var songTitle = process.argv[3];
		if(!songTitle){
			songTitle = "The Sign";
		}
	
		song.search({ type: "track", query: songTitle }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifySongs =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Song #" + i + "\r\n";
						console.log(spotifySongs);
						log(spotifySongs); // calling log function
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});

	}	


if(choice === 'movie-this'){
		// Movie function, uses the Request module to call the OMDB api
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieItem = JSON.parse(body);
				var movieListings =
				"Title: " + movieItem.Title+"\r\n"+
				"Year: " + movieItem.Year+"\r\n"+
				"Imdb Rating: " + movieItem.imdbRating+"\r\n"+
				"Rotten Tomatoes Rating: " + movieItem.tomatoRating+"\r\n"+
				"Country: " + movieItem.Country+"\r\n"+
				"Language: " + movieItem.Language+"\r\n"+
				"Plot: " + movie.Plot+"\r\n"+
				"Actors: " + movieItem.Actors+"\r\n";
				console.log(movieListings);
				log(movieListings); // calling log function
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
}

if (choice === 'do-what-it-says') {// Do What It Says function, uses the reads and writes module to access the random.txt file and do what's written in it
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				var dataArr = data.split(",");
				spotifyThisSongA(dataArr[1]);
			} else {
				console.log("Error occurred" + error);
			}
		});

}




	// Do What It Says function, uses the reads and writes module to access 
	//the log.txt file and write everything that returns in terminal in the log.txt file
	function log(logResults) {
	  fs.appendFile("log.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}


	function spotifyThisSongA(songTitle){


var song = new Spotify(keys.spotify);
	// Spotify function, uses the Spotify module to call the Spotify api

		song.search({ type: "track", query: songTitle }, function(err, data) {
			if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifySongs =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Song #" + i + "\r\n";
						console.log(spotifySongs);
						log(spotifySongs); // calling log function
					}
				}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	}