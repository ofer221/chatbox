
 let baseUrl = window.location.origin

  export const get = (url) => {
    return fetch(baseUrl + url, {method: 'GET'})
     // .then(res => res.json())
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

 export const deleteBody = (url, body) => {
    return fetch(baseUrl + url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }








