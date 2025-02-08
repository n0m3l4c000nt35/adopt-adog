export const BASE_URL = "https://api.thedogapi.com/v1/";

async function getPartialHTML(path) {
  const response = await fetch(path);
  return await response.text();
}

export function getElementHTML(selector) {
  return document.querySelector(selector);
}

function renderElement(parentElement, position = "afterbegin", element) {
  parentElement.insertAdjacentHTML(position, element);
}

export async function renderHeaderFooter() {
  const headerPartial = await getPartialHTML("../partials/header.html");
  const footerPartial = await getPartialHTML("../partials/footer.html");

  const mainHeaderHTML = getElementHTML("#main-header");
  const mainFooterHTML = getElementHTML("#main-footer");

  renderElement(mainHeaderHTML, undefined, headerPartial);
  renderElement(mainFooterHTML, undefined, footerPartial);
}

export async function getData(baseUrl, endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'x-api-key': import.meta.env.API_KEY,
    },
  });
  return await response.json();
}

export async function renderList(template, parentElement, list, position = "afterbegin", clear = true) {
  const elements = list.map(dog => template(dog));
  const resolvedElements = elements.some(el => el instanceof Promise)
    ? await Promise.all(elements)
    : elements;
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, resolvedElements.join(""));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}