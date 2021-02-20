'use strict';

//import smt from './modules.js';

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
