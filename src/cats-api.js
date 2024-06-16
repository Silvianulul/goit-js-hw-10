import axios from 'axios';
axios.defaults.headers.common[
  'live_m2IowFtzhw9zc6y5IhdleSzRuqloWIv4TbkVreM7eRSejtFE1loTHhfDcXwhPJlW'
] = 'cheia ta';

const catRace = document.querySelector('.breed-select');

const catApi = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  axios
    .get(`${catApi}/breeds`)
    .then(res => {
      res.data.map(cat => {
        renderCatNames(cat);
      });
    })
    .catch(er => {
      errorParagraph.style.visibility = 'visible';
    });
}

function renderCatNames(cat) {
  const options = document.createElement('option');
  options.setAttribute('value', cat.id);
  options.textContent = cat.name;

  catRace.append(options);
}

export const fetch = fetchBreeds();
