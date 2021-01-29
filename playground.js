'use strict'
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTMLParser = require('node-html-parser');


function gettingStatistics(method,requestUrl) {
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, requestUrl, true);
        xhr.responseType = 'text';
        xhr.onload = () => {
            console.log(xhr.responseText);
            console.log(xhr.status); 
        }
        xhr.onerrore = () =>{
            console.log(xhr.responseText);
        }
        xhr.send();
    })
  
}
    console.log(gettingStatistics('GET','https://pravonazemliu.org/api/1.0.0/statistics'));
 

 