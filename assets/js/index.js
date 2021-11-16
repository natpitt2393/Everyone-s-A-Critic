// Capture search info
 let resultPageURl = "./results.html";
$("#SearchForm").submit(OnSubmit)
function OnSubmit(event){
    event.preventDefault();
    let movieName = $("#search-bar").val();
    movieName.replace(' ', '+');
    FetchData(movieName);
}

function FetchData(p_name){
    let requestURL = "http://www.omdbapi.com/?apikey=4c323fb9&";
    requestURL += "t="+p_name;
    fetch(requestURL)
        .then(function(response){
            //Check response status
            if(response.status !== 200){
                //Do Stuff
            }
            return response.json();
        })
        .then(function(data){
            // Validate data 
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