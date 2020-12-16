const requestUrl = 'https://pravonazemliu.org/api/1.0.0/statistics';

function sendRequest(method,url) {
    return fetch(url).then(response =>{
        return response.text()
    })
}

sendRequest('GET', requestUrl)
.then(data => console.log(data))
.catch(err => console.log(err));


//
