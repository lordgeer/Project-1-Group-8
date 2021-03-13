var key = "86a96f87ec4dbad68a9ea4356c58fe4a";

var s = "http://api.mediastack.com/v1/news&?access_key=" + key;

fetch(s,  {
})
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data);
});




document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

