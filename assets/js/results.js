// Data is already in local storage. We want to retrieve it. Keyword SearchData
// What we are getting from OMDB and what we are getting from NYTIMES 
// OMDB search: Actors, Box Office, Director, Genre, Language, Year (*Maybe IMDB Title) 
// NYTIMES search: Byline, Critics Pick, MPAA-rating, Headline, Summary Short, Publication Date
//TODO:  Test Search for date validation
//iframe URL
$("#CriticsPick").on("click", false);
let TMDBSearchData = JSON.parse(localStorage.getItem("TMDBSearchData"));
$("#Movie-Title").text(TMDBSearchData.title);



let requestURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=UhbjB3IK8YrmeGTWJGAeO8LCdASCHWdA";
requestURL += "&query="+TMDBSearchData.title;
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
        DisplayNYTimesData(data);
    })
    .catch(function (error) {
        //Do Something in case of error
        console.log("Error: " + error);
    });

function DisplayNYTimesData(p_NYTimesSearchData){
    let _reviewData = PickReview(p_NYTimesSearchData);
    $("#Headline").text(_reviewData.headline);
    $("#Byline").text(_reviewData.byline);
    $("#CriticsPick").val(_reviewData.critics_pick === 1 ? true:false);
    $("#Summary").text(_reviewData.summary_short);
    $("#Published").text(_reviewData.publication_date)
    let nyArticle = $("<a>");
    nyArticle.text("Click here to see NY Times Review of movie!");
    nyArticle.attr("href", _reviewData.link.url);
    $("#abc").append(nyArticle);
}

function PickReview(p_NYTimesSearchData){
    if (p_NYTimesSearchData.results.length === 0) {OnReviewsNone(); return; }
    for(let i = 0; i < p_NYTimesSearchData.results.length; i++){
        if(CompareDates(TMDBSearchData.release_date, p_NYTimesSearchData.results[i].opening_date)){
            return p_NYTimesSearchData.results[i];
        }
    }
    // If no release date matches are found
    OnReviewsNone();
}

//OMDB Date format: Day Month(short) Year Ex: 21 Nov 2003
//NYTimes Date format Year-Month(num)-Day Ex: 2003-11-21
function CompareDates(p_TMDBDate, p_NYTIMESDate){
    // Previous function exits if no review so this should not happen but idk just in case I made this check
    if (p_TMDBDate === "N/A") { 
        console.log("Warning: TMDB release date was equal to N/A. Investigate as this case should most likely never happen."); 
        return; 
    }

    
    let years =  formatDate(p_TMDBDate, p_NYTIMESDate);
    return years.TMDBDate === years.NYTIMESDate;
    
}



function OnReviewsNone(){
    $("#NYT-search-result").text("No results found!");
}


function formatDate(p_TMDBDate, p_NYTIMESDate) {
    let dates = {
        TMDBDate:  p_TMDBDate.substring(0,4),
        NYTIMESDate: p_NYTIMESDate.substring(0,4)
    };
    return dates; 
}


    // when a user types in a movies
    // call an API to get movie data
    // save the movie data in LS
    // got to a diff page
    // get that data from LS and put in on the result page--
    // use that data from LS to make another call to NYT
    // put that data on the screen