var btnEl = document.querySelector("#btn");
var inputEl = document.querySelector("#keyword");

var key = "86a96f87ec4dbad68a9ea4356c58fe4a";

btnEl.addEventListener("click", function(event) {
    event.preventDefault();;

    var keyword = inputEl.value;
    var s = "http://api.mediastack.com/v1/news?access_key=" + key + "&keywords=" + keyword;

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