var recipeName = document.querySelector('h1');
var ingredients = document.querySelector('h2');
var directions = document.querySelector('h3');
var selector = document.querySelector('select');
var button = document.querySelector('button');
function get() {
  let value = selector.value;
  console.log(value);
  let recipeNames = fetch(`/recipes?recipes=${value}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response[0]);
      recipeName.textContent = response[0].name;
      ingredients.textContent = response[0].ingredients;
      directions.textContent = response[0].directions;
    })
    .catch(error => console.error(error));
}

selector.addEventListener('input', get);
