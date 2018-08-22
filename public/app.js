var body = document.querySelector('body');
// var recipeName = document.querySelector('h1');
var root = document.getElementById('root');
// var ingredients = document.querySelector('h2');
// var directions = document.querySelector('h3');
var selector = document.querySelector('select');
var button = document.querySelector('button');
function get() {
  while (root.childElementCount > 0) {
    root.lastElementChild.remove();
  }
  let value = selector.value;
  console.log(value);
  let recipeNames = fetch(`/recipes?recipes=${value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(value);
      console.log(response);
      response.forEach(element => {
        console.log(Object.values(element));
        let x = document.createElement('h1');
        // x.textContent = Object.values(element)[0];
        x.textContent = Object.values(element).slice(0);
        root.append(x);
      });
      // recipeName.textContent = response[0].name;
      // ingredients.textContent = response[0].ingredients;
      // directions.textContent = response[0].directions;
    })
    .catch(error => console.error(error));
}

selector.addEventListener('input', get);
