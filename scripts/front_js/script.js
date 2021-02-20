'use strict';

import RenderEngine from './modules/engine.js';
import Router from './modules/router.js';
import Client from './modules/client.js';

<<<<<<< HEAD
function checkRecaptcha() {
  const response = grecaptcha.getResponse();
  if(response.length == 0) { 
    alert("no pass"); 
  }
  else { 
    //reCaptch verified
    alert("pass"); 
  }
}
=======
function checkRecaptcha() {
  const response = grecaptcha.getResponse();
  if(response.length == 0) { 
    alert("no pass"); 
  }
  else { 
    //reCaptch verified
    alert("pass"); 
  }
}
const changeHash = hash => {
  router.changeURL(hash);
  mainF();
};

document.addEventListener('click', (evt) => {
});

const router = new Router();
const client = new Client();
const engine = new RenderEngine();

async function loadMain() {
  try {
    const view = (await import('./views/mainPage.js')).default
    const data = await client.getData('db')
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
>>>>>>> bb40a11839e9684fbaad9000ffd5fc0632794dc5
