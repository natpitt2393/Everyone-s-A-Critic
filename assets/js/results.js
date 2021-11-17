// Data is already in local storage. We want to retrieve it. Keyword SearchData
// What we are getting from OMDB and what we are getting from NYTIMES 
// OMDB search: Actors, Box Office, Director, Genre, Language, Year (*Maybe IMDB Title) 
// NYTIMES search: Byline, Critics Pick, MPAA-rating, Headline, Summary Short, Publication Date
//iframe URL

let OMDBSearchData = JSON.parse(localStorage.getItem("SearchData"));
$("#Movie-Title").text(OMDBSearchData.Title);
$("#OMDB-List").children().eq(0).text("Actors: " + OMDBSearchData.Actors);
$("#OMDB-List").children().eq(1).text("Box Office: " + OMDBSearchData.BoxOffice);
$("#OMDB-List").children().eq(2).text("Director: " + OMDBSearchData.Director);
$("#OMDB-List").children().eq(3).text("Genre: " + OMDBSearchData.Genre);
$("#OMDB-List").children().eq(4).text("Language: " + OMDBSearchData.Language);
$("#OMDB-List").children().eq(5).text("Year: " + OMDBSearchData.Released);

let NYTimesSearchData;
let requestURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=UhbjB3IK8YrmeGTWJGAeO8LCdASCHWdA&";
requestURL += "query=" + OMDBSearchData.Title;
fetch(requestURL)
    .then(function (response) {
        //Check response status
        if (response.status !== 200) {
            //Do Stuff
        }
        return response.json();
    })
    .then(function (data) {
        // Validate data 
        console.log(data);
        // Save to storage
        NYTimesSearchData = data;
    })
    .catch(function (error) {
        //Do Something in case of error
        console.log("Error: " + error);
    });



    // when a user types in a movies
    // call an API to get movie data
    // save the movie data in LS
    // got to a diff page
    // get that data from LS and put in on the result page--
    // use that data from LS to make another call to NYT
    // put that data on the screen