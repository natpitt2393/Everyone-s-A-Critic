// Capture search info
 let resultPageURl = "./results.html";
$("#SearchForm").submit(OnSubmit)
function OnSubmit(event){
    event.preventDefault();
    let movieName = $("#search-bar").val();
    let year = $("#year-field").val();
    movieName.replace(' ', '+');
    FetchData(movieName, year);
}

function FetchData(p_name){
    let requestURL = "https://api.themoviedb.org/3/search/movie?api_key=cba89e07597df25af6057ff006d6ebc5&query=Saw";
    requestURL += "query="+p_name;
   
    fetch(requestURL)
        .then(function(response){
           
            return response.json();
        })
        .then(function(data){

            displaySearchData(data);


        })
            
           
        .catch(function(error){
            //Do Something in case of error
            console.log("Error: " + error);
        });
}

function displaySearchData(p_data) {
    //for every result first create a new card for it. 
    // For every new card display all pertinent info about movie.
    // overview (plot), release_date, title, and poster
    for (let i = 0; i < data.results.length; i++) {
       let _card = generateCard();
    }

}

// let imagepath = themoviedb.org/t/p/w1280/[addimagepathhere]
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

}