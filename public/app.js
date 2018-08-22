var body = document.querySelector('body');
var root = document.getElementById('root');
var selector = document.querySelector('select');
var button = document.querySelector('button');

const removeChildren = parent => {
  while (parent.childElementCount > 0) {
    parent.lastElementChild.remove();
  }
};

function get() {
  removeChildren(root);
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
        x.textContent = Object.values(element).slice(0);
        root.append(x);
      });
    })
    .catch(error => console.error(error));
}

selector.addEventListener('input', get);
