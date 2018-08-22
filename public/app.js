var body = document.querySelector('body');
var root = document.getElementById('root');
var selector = document.querySelector('select');
var button = document.querySelector('button');
var deleteSelector = document.getElementById('deleteSelector');
var deleteButton = document.getElementById('deleteButton');
var putButton = document.getElementById('putButton');
var gridContainer = document.querySelector('.gridcontainer');

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

const get = () => {
  removeChildren(root);
  fetchSelectorValue(selector, 'GET')
    .then(response => response.json())
    .then(response => appendResults(response, 'h1', root))
    .catch(error => console.error(error));
};

// fetches recipe names, converts to option elements, appends to delete selector
const populateSelector = () => {
  fetch('/recipes?recipes=name')
    .then(response => response.json())
    .then(response => appendResults(response, 'option', deleteSelector));
};

const deleteRecipe = () => {
  fetchSelectorValue(deleteSelector, 'DELETE');
};

populateSelector();
selector.addEventListener('input', get);
deleteButton.addEventListener('click', deleteRecipe);
