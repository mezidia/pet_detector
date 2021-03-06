'use strict';

import RenderEngine from './modules/engine.js';
import Router from './modules/router.js';
import Client from './modules/client.js';
import loadChart from './chart.js';

const router = new Router();
const client = new Client();
const engine = new RenderEngine();

const MAXIMGSIZE = 100000;

function checkRecaptcha() {
  const response = grecaptcha.getResponse();
  if(response.length === 0) {
    return 0;
  }
  else { 
    return 1;
  }
}

const changeHash = hash => {
  router.changeURL(hash);
  mainF();
};

async function toDataURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const newFound = async (evt) => {
  const data = {};
  data.animal = document.getElementById('animalType-found').value;
  data.age = document.getElementById('age-found').value;
  data.color = document.getElementById('color-found').value;
  data.description = document.getElementById('disc-found').value;
  data.email = document.getElementById('email-found').value;
  data.breed = document.getElementById('breed-found').value;
  const imgInput = document.getElementById('img-found');
  data.phoneNumber = document.getElementById('phone-found').value;
  data.photo = imgInput.files[0];
  const size = data.photo.size;
  console.log(size);
  if (!data.photo) return 0;
  if (size > MAXIMGSIZE) return 0;
  const src = URL.createObjectURL(data.photo);
  data.photo = await toDataURL(src);
  data.date = Date.now();
  console.log(data);
  client.post(data, 'card/found');
}

const newLost = async (evt) => {
  const data = {};
  data.animal = document.getElementById('animalType-lost').value;
  data.age = document.getElementById('age-lost').value;
  data.color = document.getElementById('color-lost').value;
  data.description = document.getElementById('disc-lost').value;
  data.email = document.getElementById('email-lost').value;
  data.breed = document.getElementById('breed-lost').value;
  const imgInput = document.getElementById('img-lost');
  data.phoneNumber = document.getElementById('phone-lost').value;
  data.photo = imgInput.files[0];
  const size = data.photo.size;
  console.log(size);
  if (!data.photo) return 0;
  if (size > MAXIMGSIZE) return 0;
  const src = URL.createObjectURL(data.photo);
  data.photo = await toDataURL(src);
  data.date = Date.now();
  console.log(data);
  client.post(data, 'card/lost');

}
const onPostSubmit = () => {
  if (!checkRecaptcha()) return;
  console.log(router.getHash());
  client.getData(`case/${router.getHash()}`)
  .then((data) => {
    console.log(data);
    data = data[0];
    const html = `
    <h2>Електронна пошта: ${data.email}</h2>
    <h2>Номер телефону: ${data.phoneNumber}</h2>
    `;
    const capcha = document.getElementById('g-recaptcha-box');
    capcha.insertAdjacentHTML('afterEnd', html);
    capcha.remove();
    document.getElementById('post-submit').remove();
  });
}

const colorBlind = (color = true) => () => {
  if(color) {
    document.querySelector(':not(img)').style.filter = 'grayscale(100%)';
  } else {
    document.querySelector('*').style.filter = 'grayscale(0)';
  }
  color = !color;
}

const color = colorBlind();
document.addEventListener('click', (evt) => {
  if (evt.target.id === 'lost-submit') newLost();
  if (evt.target.id === 'found-submit') newFound();
  if (evt.target.id === 'found-assign') changeHash('foundForm');
  if (evt.target.id === 'lost-assign') changeHash('lostForm');
  if (evt.target.parentElement.className.split(' ')[0] === 'card') changeHash(`${evt.target.parentElement.className.split(' ').pop()}/${evt.target.parentElement.id}`);
  if (evt.target.id === 'post-submit') onPostSubmit();
  if (evt.target.id === 'colorblind') color();
});

document.addEventListener('input', (evt) => {
  if (evt.target.id === 'hue') document.querySelector('body').style.filter = `hue-rotate(${evt.target.value}deg)`
});

async function loadMain() {
  try {
    const view = (await import('./views/mainPage.js')).default;
    const data = await client.getData('found');
    engine.render(view(data));
  } catch (e) {
    console.log(e);
  }
}

let view;
const mainF = () => {
  const { viewName, endpointName } = router.getState();
  engine.loader();
  import(`./views/${viewName}.js`)
    .then((viewModel) => {
      view = viewModel.default;
      return client.getData(endpointName);
    }).then(data => {
      if (viewName === 'chartView') {
        client.getData('getForChart').then(data => {
          loadChart(data);
        });
      }
      return data;
    })
    .catch(reason => {
      console.log(reason);
      loadMain();
    })
    .then(data => {
      engine.render(view(data, router.getHash()));
    })
    .catch(reason => {
      console.log(reason);
    });

};

mainF();
window.addEventListener('hashchange', mainF);
