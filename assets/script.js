var btnEl = document.querySelector("#btn");
var inputEl = document.querySelector("#keyword");
var bodyEl = document.querySelector("body");

var key = "86a96f87ec4dbad68a9ea4356c58fe4a";
var guardianApi = `9d659950-2409-48a5-b628-08c9ecdb8d45`

var info;


btnEl.addEventListener("click", function(event) {
    event.preventDefault();;

    var keyword = inputEl.value;
    var s = "http://api.mediastack.com/v1/news?access_key=" + key + "&keywords=" + keyword + "&languages=en" + "&sources = " + ;

    fetch(s,  {
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);   
        for (var i = 0; i < 10; ++i) {
          var row = document.createElement("div");
          row.className = "row";
          var col = document.createElement("div");
          col.className = "col s12 m6";
          var card1El = document.createElement("div");
          card1El.className = "card blue-grey darken-1";
          var card2El = document.createElement("div");
          card2El.className = "card-content white-text";

          var spanEl = document.createElement("span");
          spanEl.className = "card-title";
          spanEl.innerHTML = data.data[i].title;

          var sourceEl = document.createElement("h6");
          sourceEl.textContent = data.data[i].source;

          var artDescr = document.createElement("p");
          artDescr.innerHTML = data.data[i].description;
          
          var linkEl = document.createElement("a");
          linkEl.textContent = "Link to Article";
          linkEl.href = data.data[i].url;
          linkEl.target = "_blank";  

          card2El.append(spanEl, sourceEl, artDescr, linkEl);
          card1El.append(card2El);
          col.append(card1El);
          row.append(col);
          bodyEl.append(row);
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var options = document.querySelector("#opt1");
    var instances = M.FormSelect.init(elems, options);
  });

  var displayResults = function (keyword, searchTerm) {
    
    searchTerm.textContent = searchTerm;
  
    for (var i = 0; i < keyword.length; i++) {
      var sourceName = keyword[i].owner.login + '/' + keyword[i].name;
  
      var newsEl = document.createElement('a');
      newsEl.classList = 'list-item flex-row justify-space-between align-center';
      newsEl.setAttribute(keywordText + sourceName);
  
      var titleEl = document.createElement('span');
      titleEl.textContent = sourceName;
  
      newsEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      newsEl.appendChild(statusEl);
  
      resultsContainerEl.appendChild(newsEl);
    }
  };

