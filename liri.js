//my required files (npm) and initial variable declarations
require("dotenv").config();
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var choice = process.argv[2];
var variableValue = process.argv[3];


//tweets
 if(choice === 'my-tweets'){
	
	//taking care of my api keys (actual keys are set up to be hidden from github)
	var client = new Twitter(keys.twitter);
 	
	//pulling the 20 latest tweets from twitter account
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




//spotify
if(choice === 'spotify-this-song'){ 

	//taking care of my api keys
	var song = new Spotify(keys.spotify);
	
	// getting the argument from the user for the song title.
	var songTitle = process.argv[3];
	//if user does not enter a song title, a song is added by the program
	if(!songTitle){
		songTitle = "The Sign";
		}
	
	//pulling up five songs from the spotify api (output to screen and a file)	
	song.search({ type: "track", query: songTitle }, function(err, data) {
		if(!err){
				var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifySongs =
						"Artist: " + songInfo[i].artists[0].name + "\n" +
						"Song: " + songInfo[i].name + "\n" +
						"Preview Url: " + songInfo[i].preview_url + "\n" + 
						"Album the song is from: " + songInfo[i].album.name + "\n" +
						"Song #" + i + "\n";
						console.log(spotifySongs);
						log(spotifySongs); 
					  }
				  }
		}	else {
				console.log("Error :"+ err);
				return;
			 }
		});

	}	


//movies
if(choice === 'movie-this'){
		
		//takes a movie from the user as an argument and provides a movie if no movie entered
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		
		//uses the omdb api to pull up information on the movie (output to screen and log file)
		request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieItem = JSON.parse(body);
				var movieListings =
				"Title: " + movieItem.Title+"\n"+
				"Year: " + movieItem.Year+"\n"+
				"Imdb Rating: " + movieItem.imdbRating+"\n"+
				"Rotten Tomatoes Rating: " + movieItem.tomatoRating+"\n"+
				"Country: " + movieItem.Country+"\n"+
				"Language: " + movieItem.Language+"\n"+
				"Plot: " + movie.Plot+"\n"+
				"Actors: " + movieItem.Actors+"\n";
				console.log(movieListings);
				log(movieListings); // calling log function
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
}


//taking input from a file
if (choice === 'do-what-it-says') {
		
		//the program reads a file and writes information from that file into the program
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				var dataArr = data.split(",");
				spotifyThisSongA(dataArr[1]); //function call
			} else {
				console.log("Error occurred" + error);
			}
		});

}

 
	//creates a log.txt file that saves all information output to the screen from the program
	function log(logResults) {
	  fs.appendFile("log.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}


	
	//a function that uses spotify api (takes an argument from another file and function)
	function spotifyThisSongA(songTitle){

	//api keys
	var song = new Spotify(keys.spotify);

	//spotify api used for song information
	song.search({ type: "track", query: songTitle }, function(err, data) {
		if(!err){
			var songInfo = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				if (songInfo[i] != undefined) {
						var spotifySongs =
						"Artist: " + songInfo[i].artists[0].name + "\n" +
						"Song: " + songInfo[i].name + "\n" +
						"Preview Url: " + songInfo[i].preview_url + "\n" + 
						"Album the song is from: " + songInfo[i].album.name + "\n" +
						"Song #" + i + "\n";
						console.log(spotifySongs);
						log(spotifySongs); 
				 }
			 }
		}	else {
				console.log("Error :"+ err);
				return;
			}
	});
	}