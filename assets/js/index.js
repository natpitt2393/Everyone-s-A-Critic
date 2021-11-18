// Capture search info
let resultPageURl = "./results.html";
let searchData;
let currentPage;
let numOfPages;
const MAXCARDSPERPAGE = 3;
$("#SearchForm").submit(OnSubmit)
function OnSubmit(event){
    event.preventDefault();
    let movieName = $("#search-bar").val();
    let year = $("#year-field").val();
    movieName.replace(' ', '+');
    FetchData(movieName, year);
}

function FetchData(p_name, p_year){
    let requestURL = "https://api.themoviedb.org/3/search/movie?api_key=cba89e07597df25af6057ff006d6ebc5&query=Saw";
    requestURL += "query="+p_name;
   
    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            searchData = data;
            numOfPages = Math.ceil(data.results.length / MAXCARDSPERPAGE);
            displaySearchData(0);
            currentPage = 1;
        })
            
           
        .catch(function(error){
            //Do Something in case of error
            console.log("Error: " + error);
        });
}

function displaySearchData(p_startIndex) {
    //for every result first create a new card for it. 
    // For every new card display all pertinent info about movie.
    // overview (plot), release_date, title, and poster
    for (let i = p_startIndex; i < MAXCARDSPERPAGE; i++) {
       if (!searchData) {console.warn("Search data is null"); return;}
        if (!searchData.results[i]) { return;}
        let _card = generateCard();
       _card.posterImageEl.attr("src", "https://themoviedb.org/t/p/w1280/" + searchData.results[i].poster_path);
       _card.posterImageEl.attr("alt", "The poster for the movie, " + searchData.results[i].title + ".");
       _card.movieNameEl.text(searchData.results[i].title);
       _card.movieDateEl.text(searchData.results[i].release_date);
       _card.movieOverviewEl.text(searchData.results[i].overview);
       $("card-section").append(_card.cardEl);
    }
}

//returns object storing elements: cardEl, posterContainerEl, figureEl,
//posterImageEl, movieNameEl, movieDateEl, movieOverviewEl
function generateCard() {
    let _card = $("<div>");
    _card.attr("class", "movie-card");
    let _posterContainer = $("<div>");
    _posterContainer.attr("class", "poster-image");
    let _figure = $("<figure>");
    _figure.attr("class", "");
    let _posterImage = $("<img>");
    _posterContainer.append([_figure, _posterImage]);
    let _cardContentContainer = $("<div>");
    _cardContentContainer.attr("class", "card-content");
    let _movieName = $("<div>");
    _movieName.attr("class", "movie-name");
    let _movieDate = $("<div>");
    _movieDate.attr("class", "movie-date");
    let _movieOverview = $("<div>");
    _movieOverview.attr("class", "movie-overview");
    _cardContentContainer.append([_movieName, _movieDate, _movieOverview]);
    _card.append([_posterContainer, _cardContentContainer]);
    let _cardObject = {
        cardEl: _card,
        posterContainerEl: _posterContainer,
        figureEl: _figure,
        posterImageEl: _posterImage,
        movieNameEl: _movieName,
        movieDateEl: _movieDate,
        movieOverviewEl: _movieOverview
    }
    return _cardObject;
}

//For on next button clicked
function DisplayNextPage(){
    //Make sure we don't leave range
    if(currentPage + 1 > numOfPages){
        return;
    }
    displaySearchData((currentPage*MAXCARDSPERPAGE)-MAXCARDSPERPAGE);
    currentPage++;
    CheckPagesLeft();
}

//For on back button clicked
function DisplayPreviousPage(){
    //Make sure we don't leave range
    if (currentPage - 1 < 1){
        return;
    }
    currentPage--;
    displaySearchData((currentPage*MAXCARDSPERPAGE)-MAXCARDSPERPAGE);
    CheckPagesLeft();
}

function CheckPagesLeft(){
    if (currentPage + 1 > numOfPages){
        //Disable Next Button
    } else if (currentPage - 1 < 1) {
        //Disable Back Button
    }
}

//For on click of the page numbers
function MoveToPage(p_pageNum){
    displaySearchData((p_pageNum*MAXCARDSPERPAGE)-MAXCARDSPERPAGE);
}