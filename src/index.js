console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breeds = [];


document.addEventListener("DOMContentLoaded", 
(event) => {
  
  fetch(imgUrl)
  .then(result => result.json())
  .then(json => addImages(json))
  ;
  fetch(breedUrl)
  .then(result => result.json())
  .then(json => {
    breeds = Object.keys(json.message);
    addBreeds(breeds)
  })
}
)

function addImages (e) {
  let array = e['message']
  for (const element in array) {
    let imageContainer = document.querySelector('#dog-image-container')
    let imgElement = document.createElement('img')
    imgElement.src = array[element]
    imageContainer.appendChild(imgElement)
  }
}

function addBreeds (breeds) {
  removeChildren()
  breeds.forEach(breed => addBreed(breed));
}

function addBreed (breed) {
  let breedFilter = document.querySelector('#breed-dropdown')
  let breedList = document.querySelector('#dog-breeds')
  if (breed[0] == breedFilter.value) {
    let li = document.createElement('li')
    li.innerText = breed
    breedList.appendChild(li)
  }
  breedList.addEventListener('click', handleBreedClick)
  breedFilter.addEventListener('change', handleFilterChange)
}

function handleBreedClick (e) {
  e.target.style.color = 'red'
}

function handleFilterChange (e) {
  fetch(breedUrl)
  .then(result => result.json())
  .then(json => {
    breeds = Object.keys(json.message);
    addBreeds(breeds)
  })
}

function removeChildren() {
  let ul = document.querySelector('#dog-breeds');
  let child = ul.lastElementChild;
  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
}