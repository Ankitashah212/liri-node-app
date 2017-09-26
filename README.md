# liri-node-app
Demo :  https://cl.ly/3E1O1b1r3i0k
The Program gives user four options to choose from:
  my-tweets
  spotify-this-song
  movie-this
  do-what-it-says
  
  after selecting your option, either you can specify input parameter or hit enter for default search results
  
Actions for each Selection:

--------------------
  my-tweets
--------------------
  By default fetches latest 20 tweets from the set user accout (in this case mine)
  if you do choose to enter an input, it will fetch 20 latest tweets from that username.
  
-----------------------  
  spotify-this-song
-----------------------
  By default it selects the song "when you believe"
  If you do choose to give input, it will select your song.
  As a result it provides first 3 results for the selected song from spotify in following format.
  
  song info record number 1----------------------
  Artist Name The 1975
  Preview Link null
  Song Name when you believe
  Album Name I like it when you sleep, for you are so beautiful yet so unaware of it
  song info ----------------------------------------------

  song info record number 2----------------------
  Artist Name Whitney Houston
  Preview Link https://p.scdn.co/mp3-preview/5a548d8df9d6c70d09f86795a9a3b98fe89711df?cid=07305e5036874c8c9743d6aa837bef49
  Song Name when you believe
  Album Name My Love Is Your Love
  song info ----------------------------------------------

  song info record number 3----------------------
  Artist Name Various Artists
  Preview Link null
  Song Name when you believe
  Album Name The Prince of Egypt (Soundtrack)
  song info ----------------------------------------------
  
-------------------------
  movie-this
-------------------------
By default selects movie Beauty and the Beast.
If you provide input, that's movie it will pull OMDB 
Here is how a sample output looks like.
------------------- Movie Info -------------------

Title: Beauty and the Beast
IMDB Rating: 8.0
Plot: A young woman whose father has been imprisoned by a terrifying beast offers herself in his place, unaware that her captor
 is actually a prince, physically altered by a magic spell.
Language: English, French
Actors: Robby Benson, Jesse Corti, Rex Everhart, Angela Lansbury
Country: USA
Rotten Tomatoes rating: 93%
Release Year: 1991

------------------- Movie Info -------------------

--------------------------
  do-what-it-says
--------------------------
  
  This option opens a predefined file from file system and runs a command from file.
  Which exactly looks like one of above.
  
  
  -----------------------------------------------------------------------------------------------------------
  
  The program also logs all the console output in optput.log file.
  outputfile : https://cl.ly/1L0U3I113W2G
