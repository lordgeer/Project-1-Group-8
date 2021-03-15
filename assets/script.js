var btnEl = document.querySelector("#btn");
var inputEl = document.querySelector("#keyword");
var cardEl = document.querySelector(".row");
var cardTitleEl = document.querySelector(".card-title");
var artDescrEl = document.querySelector(".articleDescr");
var linkEl = document.querySelector("#link");

var key = "86a96f87ec4dbad68a9ea4356c58fe4a";

var info;

btnEl.addEventListener("click", function(event) {
    event.preventDefault();;

    var keyword = inputEl.value;
    var s = "http://api.mediastack.com/v1/news?access_key=" + key + "&keywords=" + keyword + "&languages=en";

    fetch(s,  {
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);   

        cardEl.style.display = "block";

        cardTitleEl.innerHTML = data.data[24].title;
        artDescrEl.innerHTML = data.data[24].description;
        linkEl.textContent = "Link to Article";
        linkEl.href = data.data[24].url;  
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
  
      var repoEl = document.createElement('a');
      repoEl.classList = 'list-item flex-row justify-space-between align-center';
      repoEl.setAttribute(keywordText + sourceName);
  
      var titleEl = document.createElement('span');
      titleEl.textContent = sourceName;
  
      repoEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      repoEl.appendChild(statusEl);
  
      repoContainerEl.appendChild(repoEl);
    }
  };

