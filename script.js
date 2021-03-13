var instance = M.FormSelect.getInstance(elem);


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});
instance.getSelectedValues();