import axios from 'axios';

axios.defaults.headers.common[
  'live_m2IowFtzhw9zc6y5IhdleSzRuqloWIv4TbkVreM7eRSejtFE1loTHhfDcXwhPJlW'
] = 'cheia ta';

const catSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
catInfo.style.display = 'flex';
catInfo.style.gap = '20px';

const catApi = 'https://api.thecatapi.com/v1';

loader.style.display = 'none';
error.style.visibility = 'hidden';
error.style.color = 'red';

import { fetch } from './cats-api.js';
console.log(catSelector);

catSelector.addEventListener('change', ev => {
  catInfo.innerHTML = null;

  loader.style.display = 'block';

  const breed = ev.currentTarget.value;
  fetchCatByBreed(breed);
  setTimeout(fetchDescription(breed), 100);
});

function fetchCatByBreed(breed) {
  axios
    .get(`${catApi}/images/search?breed_ids=${breed}`)
    .then(res => {
      loader.style.display = 'none';

      console.log(res.data);
      const cat = res.data;

      cat.map(cat => {
        renderCatByBreed(cat);
      });
    })
    .catch(er => {
      loader.style.display = 'none';
      catSelector.style.display = 'none';
      error.style.visibility = 'visible';
    });
}

function renderCatByBreed(cat) {
  const catImage = document.createElement('img');
  catImage.style.width = 'calc(100% - 70%)';
  catImage.style.display = 'block';
  catImage.style.objectFit = 'cover';

  catImage.setAttribute('src', cat.url);
  console.log(catImage);
  catInfo.prepend(catImage);
  return catImage;
}

function fetchDescription(breed) {
  axios
    .get(`${catApi}/breeds`)
    .then(res => {
      //   console.log(res);
      console.log(res.data);

      res.data.find(cat => {
        if (cat.id === breed) {
          loader.style.display = 'none';

          console.log(cat.name);
          renderDescription(cat);
        }
      });
    })
    .catch(er => {
      loader.style.display = 'none';
      catSelector.style.display = 'none';
      error.style.visibility = 'visible';
    });
}

function renderDescription(cat) {
  const descriptionContainer = document.createElement('div');

  const name = document.createElement('h2');
  name.textContent = cat.name;
  name.style.margin = '0px';
  name.textContent = cat.name;

  const description = document.createElement('p');
  description.textContent = cat.description;

  const temperament = document.createElement('p');
  temperament.textContent = cat.temperament;

  const bold = document.createElement('b');
  bold.textContent = 'Temperament:';

  temperament.prepend(bold);

  descriptionContainer.append(name, description, temperament);
  catInfo.append(descriptionContainer);
}
