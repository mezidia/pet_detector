'use strict';

export default class Client {
  getData(endpoint) {
    return fetch(``)
      .then(response => response.json())
      .catch(e => console.log(e));
  }

  post(data, endpoint) {
    return fetch(``, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .catch(e => console.log(e));
  }
}
