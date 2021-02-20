'use strict';

export default class Client {
  getData(endpoint) {
    if(!endpoint) return;
    return fetch(`/${endpoint}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }

  post(data, endpoint) {
    return fetch(`/${endpoint}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .catch(e => console.log(e));
  }
  
}
