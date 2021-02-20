'use strict';

const display = (data, isLost = true) => {
  if (data === null || Object.entries(data).length === 0) return '';
  return `
  <div class="container" style="height: 30vw; overflow: hidden; min-height: 270px">
  </div>${data.map((pets, index) => `
  <div style="height: 50px"></div>
  <a href="#catalog/${pets.id}"><h1>${pets.name}</h1></a>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 style="max-width: 100%">
    ${data.pets.filter(pets => pets.categoryId === index).map(pet =>
    `<div class="card" style="min-width: 90px">
      <img class="card-img-top" src="./img/${pet.images}.jpg" alt="Card image cap">
      <div class="card-body">
        <a href="#product/${pet.id}"><h5 class="card-title">${pet.name}</h5></a>
        <h6><strong>${pet.price}</strong></h6>
        <button type="button" class="cartbtn btn btn-primary" id="${pet.id}">Add to cart</button>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  `).join('\n')}</div>`).join('\n')}`;
};

export default display;