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

function FetchData(p_name, p_year){
    let requestURL = "";
    requestURL += "query="+p_name;
    fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        //Loop through and find search criteria
        // Save to storage
        //localStorage.setItem("SearchData", data);
        //window.location.assign(resultPageURl);
    })
        .catch(function(error){
            //Do Something in case of error
            console.log("Error: " + error);
        });
}