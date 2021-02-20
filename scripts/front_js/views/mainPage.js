'use strict';

const display = (data) => {
  if (data === null || Object.entries(data).length === 0) return '';
  return `
   <div style="height: 50px"></div>
  <h1>${data.status === 'lost' ? 'Загублені улюбленці' : 'Знайдені улюбленці'}</h1>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 style="max-width: 100%">
    ${data.pets.map(pet => `<div class="card" style="min-width: 100px">
      <img class="card-img-top" src="${pet.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${pet.animal}</h5>
        <h6>${pet.breed}</h6>
        <h6>${pet.color}</h6>
        <h6>${pet.description}</h6>
        <button type="button" class="infobtn btn btn-primary" id="${pet.id}">Info</button>
      </div>
      <div class="card-footer">
        <small class="text-muted">Опрелюднено: ${pet.date}</small>
      </div>
    </div>`).join('\n')}
  </div>
  <div class="row assign-btns">
    <button id="lost-assign" class="col-md-6 btn btn-primary btn-50">Сповістити про втраченого улюбленця</button>
    <button id="found-assign" class="col-md-6 btn-primary btn-50">Сповістити про знайденого улюбленця</button>
  </div>
  `;

};

export default display;