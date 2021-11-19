const MAXCARDSPERPAGE = 3;
const PLACEHOLDERIMG = "https://via.placeholder.com/150"
// Capture search info
let resultPageURl = "./results.html";
let searchData;
let currentPage;
let numOfPages;
// Effective Enum with two values: Search and Results
let currentPageLayout = "Search"; //Default value is search
SwitchPageLayout();

$("#SearchForm").submit(OnSubmit)
function OnSubmit(event){
    event.preventDefault();
    let movieName = $("#search-bar").val();
    let year = $("#year-field").val();
    movieName.replace(' ', '+');
    FetchData(movieName, year);
}

$("#backbtn").on("click", DisplayPreviousPage);

$("#nextbtn").on("click", DisplayNextPage);

$("pageNumContainer").on("click", function(event){
    event.preventDefault();
    if (event.target.tagName === "A"){
        MoveToPage(event.target.id);
    }
    else{
        console.log("Idk events be complex")
    }
});

function SwitchPageLayout(){
    if (currentPageLayout === "Search"){
        $("#searchSection").attr("class", "searchbox");
        $("#navBtns").attr("class", "hide");
        $("#movieSection").attr("class", "hide");
    } else if (currentPageLayout === "Results"){
        $("#movieSection").attr("class", "movie-section");
        $("#navBtns").attr("class", "navbtns");
        $("#searchSection").attr("class", "hide");
    } else {
        console.error("Invalid Page Layout Value");
        //TODO: Deal with error
    }
}

function FetchData(p_name, p_year){
    let requestURL = "https://api.themoviedb.org/3/search/movie?api_key=cba89e07597df25af6057ff006d6ebc5&";
    requestURL += "query="+p_name;
   
    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            currentPage = 1;
            currentPageLayout = "Results";
            searchData = data;
            numOfPages = Math.ceil(data.results.length / MAXCARDSPERPAGE);
            displaySearchData(0);
            DisplayPageNumbers();
            SwitchPageLayout();
        })
            
           
        .catch(function(error){
            //Do Something in case of error
            console.log("Error: " + error);
        });
}

function displaySearchData(p_startIndex) {
    $("#movieSection").children().remove();
    //for every result first create a new card for it. 
    // For every new card display all pertinent info about movie.
    // overview (plot), release_date, title, and poster
    for (let i = p_startIndex; i < MAXCARDSPERPAGE+p_startIndex; i++) {
       if (!searchData) { console.warn("Search data is null"); return; } 
        if (!searchData.results[i]) { return; }
        console.log(searchData.results[i]);
        let _card = generateCard();
        if (searchData.results[i].poster_path != null){
            _card.posterImageEl.attr("src", "https://themoviedb.org/t/p/w1280/" + searchData.results[i].poster_path);
            _card.posterImageEl.attr("alt", "The poster for the movie, " + searchData.results[i].title + ".");
        }else{
            _card.posterImageEl.attr("src", PLACEHOLDERIMG);
            _card.posterImageEl.attr("alt", "Was supposed to be a poster for the movie, " + searchData.results[i].title + " but it an image was not found.");
        }
       _card.movieNameEl.text(searchData.results[i].title);
       _card.movieDateEl.text(searchData.results[i].release_date);
       _card.movieOverviewEl.text(searchData.results[i].overview);
       _card.wrapperAnchor.attr("id", ""+i);
       AddCardClickEvent(_card.wrapperAnchor);
       $("#movieSection").append(_card.cardEl);
    }
}


// TODO:  Restrict max page numbers at once and "scroll" the numbers depending on position
function DisplayPageNumbers(){
    for (let i = 1; i <= numOfPages; i++){
        //Create number element
        let numberEl = $("<a>");
        if(i === currentPage){
            numberEl.attr("id", "currentnum");
        } else {
            numberEl.attr("id", i+"");
            numberEl.attr("class", "pagenum");
        }
        numberEl.text(""+i);
        $("#pageNumContainer").append(numberEl);
    }
}

//returns object storing elements: wrapperAnchor, cardEl, posterContainerEl, figureEl,
//posterImageEl, movieNameEl, movieDateEl, movieOverviewEl
function generateCard() {
    let _wrapperAnchor = $("<a>");
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
    _wrapperAnchor.append(_card);
    let _cardObject = {
        wrapperAnchor: _wrapperAnchor,
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
    //Should call unless its displayed
    if(currentPageLayout !== "Results"){return;}
    //Make sure we don't leave range
    if(currentPage + 1 > numOfPages){
        return;
    }
    currentPage++;
    displaySearchData((currentPage*MAXCARDSPERPAGE)-MAXCARDSPERPAGE);
    CheckPagesLeft();
}

//For on back button clicked
function DisplayPreviousPage(){
    //Should call unless its displayed
    if(currentPageLayout !== "Results"){return;}
    //Make sure we don't leave range
    if (currentPage - 1 < 1){
        return;
    }
    currentPage--;
    displaySearchData((currentPage*MAXCARDSPERPAGE)-MAXCARDSPERPAGE);
    CheckPagesLeft();
}

//Fix enable code and fix backBtn disable condition
function CheckPagesLeft(){
    let _nextBtn = $("#nextbtn");
    let _backBtn = $("#backbtn");
    if (currentPage + 1 > numOfPages){
        //Disable Next Button
        _nextBtn.prop("disabled", true);
        console.log("ButtonDisabled")
    } else if (currentPage - 1 < 1) {
        //Disable Back Button
        _backBtn.prop("disabled", true);
        console.log("ButtonDisabled")
    }
    if (_nextBtn.prop("disabled") && !currentPage + 1 > numOfPages){
        //Enable Next Button if disabled
        _nextBtn.prop("disabled", false);
    }
    if (_backBtn.prop("disabled") && !currentPage - 1 < 1){
        //Enable Back Button if disabled
        _backBtn.prop("disabled", false);
    }
}

//For on click of the page numbers
function MoveToPage(p_pageNum){
    if (p_pageNum <= 0 || p_pageNum > numOfPages){
        console.warn("Attempted to move to page out of range.")
        return;
    }
    console.log("MoveToPage")
    displaySearchData((p_pageNum*MAXCARDSPERPAGE)-MAXCARDSPERPAGE);
    currentPage = p_pageNum;
}

function AddCardClickEvent(p_wrapperAnchor){
    p_wrapperAnchor.on("click", OnCardClicked);
}

function OnCardClicked(event){
    event.preventDefault();
    localStorage.setItem("TMDBSearchData", JSON.stringify(searchData.results[event.target.id]));
}