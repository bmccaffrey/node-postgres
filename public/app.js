var body = document.querySelector('body');
var root = document.getElementById('root');
var selector = document.querySelector('select');
var button = document.querySelector('button');

const removeChildren = parent => {
  while (parent.childElementCount > 0) {
    parent.lastElementChild.remove();
  }
};

const appendResults = response => {
  console.log(response);
  response.forEach(element => {
    console.log(Object.values(element));
    let x = document.createElement('h1');
    x.textContent = Object.values(element).slice(0);
    root.append(x);
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
    .then(response => appendResults(response))
    .catch(error => console.error(error));
};

selector.addEventListener('input', get);
