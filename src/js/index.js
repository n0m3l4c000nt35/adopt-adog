import { BASE_URL, getData, getElementHTML, renderHeaderFooter } from "./utils";
import Dogs from "./dogs";

renderHeaderFooter();

const dogsData = await getData(BASE_URL, "breeds?limit=10")
const dogs = new Dogs(dogsData);
dogs.init();

document.addEventListener("click", e => {
  if (e.target.matches("#menu-open")) {
    getElementHTML("#nav").classList.add("show");
    getElementHTML("#menu-open").classList.add("hide");
    getElementHTML("#menu-close").classList.add("show");
  } else if (e.target.matches("#menu-close")) {
    getElementHTML("#nav").classList.remove("show");
    getElementHTML("#menu-open").classList.remove("hide");
    getElementHTML("#menu-close").classList.remove("show");
  }
});