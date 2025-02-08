import { BASE_URL, getData, getElementHTML, getLocalStorage, renderList, setLocalStorage } from "./utils";

async function dogTemplate(dog) {
  const { url, width, height } = await getData(BASE_URL, `images/${dog.reference_image_id}`)
  const adoptedDogs = getLocalStorage("aad");
  const isAdopted = adoptedDogs?.includes(String(dog.id));

  return `<article class="dog">
    <div class="dog__image-container">
      <img class="dog__image" src="${url}" alt="${dog.name}" width="${width}" height="${height}" loading="lazy">
    </div>
    <p class="dog__name"><b>Name</b>: ${dog.name}</p>
    ${dog.origin ? `<p class="dog__origin"><b>Origin</b>: ${dog.origin}</p>` : ""}
    <p class="dog__breadfor"><b>For</b>: ${dog.bred_for}</p>
    <p class="dog__lifespan"><b>Life span</b>: ${dog.life_span}</p>
    <p><b>Weight</b>: ${dog.weight.metric}</p>
    <p><b>Height</b>: ${dog.height.metric}</p>
    <p><b>Temperament</b>: ${dog.temperament}</p>
    <button class="dog__adoptbtn" data-dogid="${dog.id}" ${isAdopted ? 'disabled' : ''}>
      ${isAdopted ? "Adopted" : "Adopt Dog"}
    </button>
  </article>`;
}

export default class Dogs {
  constructor(data) {
    this.data = data;
  }
  init() {
    this.renderDogs();
    document.addEventListener("click", (event) => {
      if (event.target.matches("button[data-dogid]")) {
        const dogId = event.target.dataset.dogid;
        this.adoptDog(dogId);
        this.renderDogs();
      }
    });
  }
  renderDogs() {
    const parentElement = getElementHTML("#main-section");
    parentElement.classList.add("dogs-section");
    renderList(dogTemplate, parentElement, this.data);
  }
  adoptDog(dogId) {
    const adoptedDogs = getLocalStorage("aad") || [];
    if (!adoptedDogs.includes(dogId)) {
      adoptedDogs.push(dogId);
      setLocalStorage("aad", adoptedDogs);
    }
  }
}