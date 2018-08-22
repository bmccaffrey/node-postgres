var body = document.querySelector('body');
var root = document.getElementById('root');
var selector = document.querySelector('select');
var button = document.querySelector('button');
var deleteSelector = document.getElementById('deleteSelector');
var deleteButton = document.getElementById('deleteButton');

const removeChildren = parent => {
  while (parent.childElementCount > 0) {
    parent.lastElementChild.remove();
  }
};

const appendResults = (response, element, target) => {
  console.log(response);
  response.forEach(item => {
    console.log(Object.values(item));
    let x = document.createElement(element);
    x.textContent = Object.values(item).slice(0);
    target.appendChild(x);
  });
};

const fetchSelectorValue = () => {
  let value = selector.value;
  console.log(value);
  return fetch(`/recipes?recipes=${value}`);
};

const get = () => {
  removeChildren(root);
  fetchSelectorValue()
    .then(response => response.json())
    .then(response => appendResults(response, 'h1', root))
    .catch(error => console.error(error));
};

const populateSelector = () => {
  fetch('/recipes?recipes=name')
    .then(response => response.json())
    .then(response => appendResults(response, 'option', deleteSelector));
};

selector.addEventListener('input', get);
deleteButton.addEventListener('click', getRecipeNames);
