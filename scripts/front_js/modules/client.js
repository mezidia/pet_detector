'use strict';

export default class Client {
  getData(endpoint) {
    return fetch(`/${endpoint}`)
      .then(response => response.json())
      .catch(e => console.log(e));
  }

  post(data, endpoint) {
    return fetch(`/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .catch(e => console.log(e));
  }
  
}
