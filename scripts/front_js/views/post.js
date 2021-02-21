const display = (data) => {
  function insertApi(lastNode) {
    const el = document.createElement('script');
    el.src = 'https://www.google.com/recaptcha/api.js';
    el.defer = true;
    el.async = true;
    el.id = 'api';
    lastNode.after(el);
  }
  let lastNode = document.head.childNodes[document.head.childNodes.length - 2];
  if (lastNode.id === 'mainScr') {
    insertApi(lastNode);
  } else if (lastNode.id === 'api') {
    lastNode.remove();
    lastNode = document.head.childNodes[document.head.childNodes.length - 2];
    insertApi(lastNode);
  }
  console.log(data);
  data = data[0];
  return `
  <div class="container-fluid">
    <div class="row" style="margin-top: 40px">
      <div class="col-md-5">
        <img src="${data.photo}" style="width: 100%">
      </div>
      <div class="col-md-7" style="padding-left: calc(5px + 0.2vw)">
        <h1 style="text-align: center">${data.animal}</h1>
        <h2>Порода: ${data.breed}</h2>
        <h2>Колір: ${data.color}</h2>
        ${data.description ? `<h2>Опис тварини - ${data.description} </h2>` : ''}
        <hr style="margin-left: calc(-5px - 0.2vw)">
        <h1 style="text-align: center">Контакти</h1>
        <div id="g-recaptcha-box">
        <div class="g-recaptcha" data-sitekey="6LfER2AaAAAAAAZC3D1nW1ViH6m3JBgY0Y8Z228e"></div>
        </div>
        <button type="buton" id="post-submit" class="btn btn-primary" style="min-height: 50px; min-width: 200px">Показати контакти</button>
      </div>
    </div>
  </div>
  `
}

export default display;
