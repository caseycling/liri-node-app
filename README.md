# liri-node-app

## What is liri?
Liri is node-based application which takes in arguments from the command line to give information on movies, songs and concerts. With a few simple commands, it can query results from Spotify, Bands In Town and the Online Movie Database.

## How it works
The first argument you pass through to the command line sets the parameters of function whichCommand. This contains a switch case statment which allows a specific API to be called depending on the argument you set. The second argument sets parameters for the function within the switch case that are then used to query the API and give a response. Here you can see the app take in a command to search Bands In Town for a concert, passing through 'concert-this':
[https://drive.google.com/file/d/196e8LFflbchrGtg11_hQtDur-x0qLsNP/view]

Spotify is similarly called with the command 'spotify-this-song':
[https://drive.google.com/file/d/1tOtZwUGmfWHQh30pM8YO1L_P-AncKzwN/view]

Without any input passed through after 'spotify-this-song', the app automatically assigns its own value in the query url:
[https://drive.google.com/file/d/172FYFJE3hKvqZ8pTBhbPqVb3A7j5p-Ij/view]

OMBD is called with 'movie-this':
[https://drive.google.com/file/d/1K-S4zEVwl4wqnBEehIVs4ERtw4wQZwFK/view]

Without any input, it automatically calls and returns information for the movie Mr. Nobody:
[https://drive.google.com/file/d/1FUfmp1c4nhyGraKV7KJZBHPcaiav9kGa/view]

The 'do-what-it-says' command does something a bit more complicated than the others. Using the file system module (fs), the readFile method is called to read the text from another file (random.txt) and returns the data into an array. This data is then passed in as arguments into the whichCommand function and its respective function is called. The text happened to be 'spotify-this-song' and 'I want it that way':
[https://drive.google.com/file/d/1iIYTNOLyE0U2AwUUfGHMWEI5eXsIsDEX/view]

This is a great app to quickly and effectively acces massive musical and film databases. It really showcases the power of node in its ability to make API calls, utilize its various modules, use callbacks and the relative ease of adding node packages.