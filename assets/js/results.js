// Data is already in local storage. We want to retrieve it. Keyword SearchData
// What we are getting from OMDB and what we are getting from NYTIMES 
// OMDB search: Actors, Box Office, Director, Genre, Language, Year (*Maybe IMDB Title) 
// NYTIMES search: Byline, Critics Pick, MPAA-rating, Headline, Summary Short, Publication Date
//TODO:  Test Search for date validation
//iframe URL
$("#CriticsPick").on("click", false);
let TMDBSearchData = JSON.parse(localStorage.getItem("TMDBSearchData"));
$("#Movie-Title").text(TMDBSearchData.Title);
$("#TMDB-plot").text("Plot: " + TMDBSearchData.Plot);
$("#TMDB-List").children().eq(0).text("Actors: " + TMDBSearchData.Actors);
$("#TMDB-List").children().eq(1).text("Box Office: " + TMDBSearchData.BoxOffice);
$("#TMDB-List").children().eq(2).text("Director: " + TMDBSearchData.Director);
$("#TMDB-List").children().eq(3).text("Genre: " + TMDBSearchData.Genre);
$("#TMDB-List").children().eq(4).text("Language: " + TMDBSearchData.Language);
$("#TMDB-List").children().eq(5).text("Year: " + TMDBSearchData.Released);


let requestURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=UhbjB3IK8YrmeGTWJGAeO8LCdASCHWdA";
requestURL += "&query="+TMDBSearchData.Title;
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
        if(CompareDates(TMDBSearchData.Released, p_NYTimesSearchData.results[i].opening_date)){
            return p_NYTimesSearchData.results[i];
        }
    }
    // If no release date matches are found
    OnReviewsNone();
}

//OMDB Date format: Day Month(short) Year Ex: 21 Nov 2003
//NYTimes Date format Year-Month(num)-Day Ex: 2003-11-21
function CompareDates(p_OMDBDate, p_NYTimesDate){
    // Previous function exits if no review so this should not happen but idk just in case I made this check
    if (p_OMDBDate === "N/A") { 
        console.log("Warning: OMDB release date was equal to N/A. Investigate as this case should most likely never happen."); 
        return; 
    }
    p_OMDBDate = FormatOMDBDate(p_OMDBDate);
    return p_OMDBDate === p_NYTimesDate;
}

//Returns OMDB date formatted like NYTimesDate
function FormatOMDBDate(p_OMDBDate){
    // Values: 0 - day, 1 - month, 2 - year
    let p_OMDBDateValues = p_OMDBDate.split(" ");
    switch(p_OMDBDateValues[1])
    {
        case "Jan":
            p_OMDBDateValues[1] = "01";
            break;
        case "Feb":
            p_OMDBDateValues[1] = "02";
            break;
        case "Mar":
            p_OMDBDateValues[1] = "03";
            break;
        case "Apr":
            p_OMDBDateValues[1] = "04";
            break;
        case "May":
            p_OMDBDateValues[1] = "05";
            break;
        case "Jun":
            p_OMDBDateValues[1] = "06";
            break;
        case "Jul":
            p_OMDBDateValues[1] = "07";
            break;
        case "Aug":
            p_OMDBDateValues[1] = "08";
            break;
        case "Sep":
            p_OMDBDateValues[1] = "09";
            break;
        case "Oct":
            p_OMDBDateValues[1] = "10";
            break;
        case "Nov":
            p_OMDBDateValues[1] = "11";
            break;
        case "Dec":
            p_OMDBDateValues[1] = "12";
            break;
    }
    return p_OMDBDateValues[2] + "-" + p_OMDBDateValues[1] + "-" + p_OMDBDateValues[0];
}

function OnReviewsNone(){
    $("#NYT-search-result").text("No results found!");
}





    // when a user types in a movies
    // call an API to get movie data
    // save the movie data in LS
    // got to a diff page
    // get that data from LS and put in on the result page--
    // use that data from LS to make another call to NYT
    // put that data on the screen