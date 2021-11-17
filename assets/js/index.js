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
    let requestURL = "http://www.omdbapi.com/?apikey=4c323fb9&";
    requestURL += "t="+p_name;
    if (p_year !== "") {
        requestURL += "&y=" + p_year;
    } 
    fetch(requestURL)
        .then(function(response){
            //Check response status
            if(response.status !== 200){
                //Do Stuff
            }

            //console.log(response)
            return response.json();
        })
        .then(function(data){
            // Validate data
            if (data.Response === "False")
            {
                //Give error
                //alert("Movie not found! Try searching again!");
                return;
            }
            console.log(data);
            // Save to storage
            localStorage.setItem("SearchData", JSON.stringify(data))
             window.location.assign(resultPageURl);
        })
        .catch(function(error){
            //Do Something in case of error
            console.log("Error: " + error);
        });
}