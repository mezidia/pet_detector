const display = (data) => {
  data = data.data;
  return `
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <img src="${data.photo}" style="width: 100%">
      </div>
      <div class="col-md-8">
        <h1>${data.animal}</h1>
        <h2>Порода: ${data.breed}</h2>
        <h2>Колір: ${data.color}</h2>
        <p>Опис: ${data.description}</p>
        <hr>
        <h1>Контакти</h1>
        <h2>Електронна пошта: ${data.email}</h2>
        <h2>Номер телефону: ${data.phoneNumber}</h2>
      </div>
    </div>
  </div>
  `
}

export default display;
