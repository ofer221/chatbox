
let baseUrl = window.location.origin
 //let baseUrl = "http://localhost:5000"

  export const get = (url) => {
    return fetch(baseUrl + url, {method: 'GET'})

  }
    export const put = (url, body) => {
    return fetch(baseUrl + url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

 export const post = (url, body,headers) => {
    return fetch(baseUrl + url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
  }









