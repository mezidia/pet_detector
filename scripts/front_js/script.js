'use strict';

import RenderEngine from './modules/engine.js';
import Router from './modules/router.js';
import Client from './modules/client.js';

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
