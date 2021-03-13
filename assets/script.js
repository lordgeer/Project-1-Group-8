var btnEl = document.querySelector("#btn");
var inputEl = document.querySelector("#keyword");

var key = "86a96f87ec4dbad68a9ea4356c58fe4a";

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