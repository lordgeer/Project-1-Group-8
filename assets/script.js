// create html elements
var btnEl = document.querySelector("#btn");
var inputEl = document.querySelector("#keyword");
var bodyEl = document.querySelector("body");
var elems = document.querySelector('select');
var instances = M.FormSelect.init(elems);
var cardContainer = document.createElement("div");

// mediastack api key
var key = "afb46eb9598ac8e446e34471c37909f3";

// guardian api key
var guardianApi = "9d659950-2409-48a5-b628-08c9ecdb8d45";

// array to store user selected options from modal
var storeSources = [];

// array to store article titles 
// to check for duplicate articles
var storeTitle = [];

// event listener for user selected sources from the modal
document.addEventListener('DOMContentLoaded', function () {
  elems.onchange = selectThem;
  function selectThem() {
      var selectedOne = instances.getSelectedValues();
  }
});

// search button click event listener
btnEl.addEventListener("click", function(event) {
    event.preventDefault();

    // if no selections are present in the modal,
    // clear the localStorage
    for (var i = 1; i < elems.length; ++i) {
      if (elems[i].selected == false) {
        localStorage.clear();
      }
    }    

    // clear contents of card container 
    // each time the button is pressed so that
    // articles dont continuously stack on the page
    cardContainer.innerHTML = "";

    // get the users input
    var keyword = inputEl.value;

    // check if user made any source selections from the modal
    var hasSelected = instances.getSelectedValues();
    var getSources = document.getElementsByTagName("option");

    // create an empty string used for creating api url
    var apiUrl = "";
    // check if the user did NOT select any sources from the modal, 
    // if true fetch from guardian api
    if ((hasSelected.length == 1 && hasSelected == 0) || hasSelected.length == 0)
    {
      // set string to guardian api url
      apiUrl = "https://content.guardianapis.com/search?page=2&q="+ keyword + "&api-key=test";

      // fetch api url
      fetch(apiUrl,  {
      })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) { 
          // create var for length of results from the guardian, 
          // and if results are greater than 10, set it to 10  
          var guardianListLength = data.response.results.length;
        
          // loop through guardian response results
          for (var i = 0; i < guardianListLength; ++i) {

            // create dynamic html elements
            // create div element and set its class
            var row = document.createElement("div");
            row.className = "row";
            // create div element and set its class
            var col = document.createElement("div");
            col.className = "col s12 m6";
            // create div element and set its class
            var card1El = document.createElement("div");
            card1El.className = "card blue-grey darken-1";
            // create div element and set its class
            var card2El = document.createElement("div");
            card2El.className = "card-content white-text";

            // create span element for displaying article title 
            var spanEl = document.createElement("span");
            spanEl.className = "card-title";
            spanEl.textContent = data.response.results[i].webTitle;
            
            // create H6 element for displaying article type/genre
            var typeEl = document.createElement("h6");
            typeEl.textContent = "Article Type: " + data.response.results[i].sectionName;
            typeEl.textContent.toUpperCase();
            
            // create anchor element for link to article
            var linkEl = document.createElement("a");
            linkEl.textContent = "Link to Article";
            // set anchor element href to url of article
            linkEl.href = data.response.results[i].webUrl;
            linkEl.target = "_blank";  

            // append all elements within proper div
            card2El.append(spanEl, typeEl, linkEl);
            card1El.append(card2El);
            col.append(card1El);
            row.append(col);
            // append card to the cardContainer
            cardContainer.append(row);
          }
      });
    }
    else 
    {
      // if user makes slection from modal
      // clear the array and local storage
      storeSources = [];

      // find which options the user has selected 
      // from the modal, and store the info in local  storage
      for (var i = 0; i < hasSelected.length; ++i) {
        for (var j = 0; j < getSources.length; ++j) {
          if (hasSelected[i] == getSources[j].value) {
            storeSources.push(getSources[j].value);
          }
        } 
      }
      // store array of selected sources in local storage
      localStorage.setItem("newsSources", JSON.stringify(storeSources));
      // if user selects source from modal, set api url to mediastack
      var storeSourcesStr = storeSources.join(",");

      console.log("str1: " + storeSourcesStr);

      apiUrl = "https://cors-anywhere.herokuapp.com/http://api.mediastack.com/v1/news?access_key=" + key + "&keywords=" + keyword + "&sources=" + storeSourcesStr + "&languages=en";

      // fetch api url
      fetch(apiUrl,  {
      })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          console.log(data);

          // loop thorugh api response data
          for (var i = 0; i < data.data.length; ++i) {

            // boolean variable
            var isSame = false;
            // loop through stores article titles
            for (var j = 0; j < storeTitle.length; ++j) {
              if (data.data[i].title == storeTitle[j]) {
                // if article title matches one that's 
                // already stored, set the flag to true
                isSame = true;
                break;
              }
            }
            
            // if isSame flag is set to true, 
            // continue to next iteration
            if (isSame) {
              continue;
            }

            // create dynamic html elements
            // create div and set its class
            var row = document.createElement("div");
            row.className = "row";
            // create div and set its class
            var col = document.createElement("div");
            col.className = "col s12 m6";
            // create div and set its class
            var card1El = document.createElement("div");
            card1El.className = "card blue-grey darken-1";
            // create div and set its class
            var card2El = document.createElement("div");
            card2El.className = "card-content white-text";

            // create span element for displaying article title
            var spanEl = document.createElement("span");
            spanEl.className = "card-title";
            spanEl.textContent = data.data[i].title;

            // if article is unique, store in array
            storeTitle.push(data.data[i].title);

            // create H6 element for displaying article type/genre
            var sourceEl = document.createElement("h6");
            sourceEl.textContent = "Source: " + data.data[i].source;
            sourceEl.textContent.toUpperCase();

            // create P element for displaying article description
            var artDescr = document.createElement("p");
            artDescr.innerHTML = data.data[i].description;
            
            // create anchor element for link to article
            var linkEl = document.createElement("a");
            linkEl.textContent = "Link to Article";
          // set anchor element href to url of article
            linkEl.href = data.data[i].url;
            linkEl.target = "_blank";  

            // append all elements within the proper div
            card2El.append(spanEl, sourceEl, artDescr, linkEl);
            card1El.append(card2El);
            col.append(card1El);
            row.append(col);
            // append card to the cardContainer
            cardContainer.append(row);
        }
      });
    } 
    // append cardContainer to the body
    bodyEl.append(cardContainer);
});

// initialize funtion to get data from local storage
function init() {
  // get values from local storage and 
  // put them into the storeSOurces array
  var storedNewsSources = JSON.parse(localStorage.getItem("newsSources"));
  if (storedNewsSources !== null) {
    storeSources = storedNewsSources;
  }

  // loop through modal elements starting at index 1
  for (var i = 1; i < elems.length; ++i) {
    // loop through storeSources array
      for (var j = 0; j < storeSources.length; ++j) {
    
        // if values stored in local storage match
        // the value of the modal select option,
        // set that select option to be pre-selected
        if (elems[i].value == storeSources[j]) {
          elems[i].selected = true;
        }
      }
  }
}

init();

