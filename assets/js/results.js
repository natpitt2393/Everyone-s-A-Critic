// Data is already in local storage. We want to retrieve it. Keyword SearchData
// What we are getting from OMDB and what we are getting from NYTIMES 
// OMDB search: Actors, Box Office, Director, Genre, Language, Year (*Maybe IMDB Title) 
// NYTIMES search: Byline, Critics Pick, MPAA-rating, Headline, Summary Short, Publication Date
//iframe URL

let OMDBSearchData = JSON.parse(localStorage.getItem("SearchData"));
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