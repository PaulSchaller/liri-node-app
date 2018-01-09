require("dotenv").config();
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var choice = process.argv[2];
var variableValue = process.argv[3];



 //tweets
var client = new Twitter(keys.twitter);
 

var params = {screen_name: 'Paul Schaller', count: 20};
 if(choice === 'my-tweets'){
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i = 0; i < tweets.length; i++){
    	  var twitterTweets = 
    	  	tweets[i].user.screen_name +": " + 
	        tweets[i].text + "\n" + 
	        tweets[i].created_at + "\n" + 
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




//spotify 
var song = new Spotify(keys.spotify);

if(choice === 'spotify-this-song'){ 
	var songTitle = process.argv[3];

	if(!songTitle){
			songTitle = 'The Sign';
		}
	
	console.log(songTitle); 
	
	song.search({ type: 'track', query: songTitle }, function(err, data) {
  		console.log(data);
  		console.log(data.album.name);
  		if (err) {
    		return console.log('Error: ' + err);
  			} else {
						var songInfo = data.tracks.items;
						console.log(songInfo.artists[0].name);
						var spotifySongs =
							"Artist: " + songInfo.artists[0].name + "\n" +
							"Song: " + songInfo.name + "\n" +
							"Preview Link: " + songInfo.preview_url+ "\n" + 
							"Album the song is from: " + songInfo.album.name + "\n";
						
						console.log(spotifySongs);
						log(spotifySongs); // calling log function
					
				
			}
		});

}


if(choice === 'movie-this'){
		// Movie function, uses the Request module to call the OMDB api
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		console.log(movie);
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
				var movieItem = JSON.parse(body);
				 console.log(movieItem);
				//console.log(movieItem); // Show the text in the terminal
				var movieListings =
				"------------------------------ begin ------------------------------" + "\r\n"
				"Title: " + movieItem.Title+"\r\n"+
				"Year: " + movieItem.Year+"\r\n"+
				"Imdb Rating: " + movieItem.imdbRating+"\r\n"+
				"Rotten Tomatoes Rating: " + movieItem.tomatoRating+"\r\n"+
				"Country: " + movieItem.Country+"\r\n"+
				"Language: " + movieItem.Language+"\r\n"+
				"Plot: " + movie.Plot+"\r\n"+
				"Actors: " + movieItem.Actors+"\r\n"+
				"------------------------------ fin ------------------------------" + "\r\n";
				"------------------------------ fin ------------------------------" + "\r\n";
				console.log(Listings);
				log(movieListing); // calling log function
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
}

if (choice === 'do-what-it-says') {// Do What It Says function, uses the reads and writes module to access the random.txt file and do what's written in it
		fs.readFile("random.txt", "utf8", function(error, data){
			console.log(data);
			if (!error) {
				//var dataArr = data.split(",");
				spotifyThisSongA(data);
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


function spotifyThisSongA(data){
	console.log(data);
}