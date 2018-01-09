LIRI Node App
______________________________________________________________________

LIRI Node App supplies information to user requests through the interface of
	a command line in node.js

LIRI supplies detailed and extensive information on items with just short calls typed in 
	by the user.  

There are four categories of information requests:
	1.  my-tweets
    2.  spotify-this-song
    3.  movie-this
	4.  do-what-it-says

From the command line in node.js, the user types in "node liri.js" to start all requests for information.  After "node liri.js", the user types in one of the four categories just mentioned.  	
For "my-tweets" and "do-what-it-says", this completes the request and the user hits enter to receive the 
	results.  For "spotify-this-song", the user adds the name of the song he is interested in enclosed in quotation marks.  Then he enters the request.  For "movie-this", the user adds the name of a movie he is interested in enclosed in quotation marks.  Then he hits the enter button. 

my-tweets will output the last 20 tweets of my twitter account along with the dates they were written.
spotify-this-song will list five songs along with a preview link, artist, and album.
movie-this will list the title, year, IMDB rating, Rotten Tomatoes Rating, country, language, plot, and 
	actors of the movie.
do-what-it-says will read a file and take information from that file to initiate a request for 
	information on a song.

The information output to the screen will also be saved to a (log) file.

To run the program you will need the npm packages of fs (in node), twitter, spotify, and request.  You can install twitter with the command line entry [npm install twitter].  You can install request with the command line entry [npm install request].  You can install spotify with the command line entry [npm install --save node-spotify-api].

I kept my twitter and spotify api keys private to my computer by not having them posted to github with special file management.  To run this program, the user will need to supply their own api keys.