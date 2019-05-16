
let baseUrl = window.location.origin
//let baseUrl = "http://localhost:5000"

//Api
const get = (url,headers) => {
  return fetch(baseUrl + url, {method: 'GET',headers:{...headers}})

}
const put = (url, body) => {
  return fetch(baseUrl + url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const post = (url, body,headers) => {
  return fetch(baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

//Calls
export const signup = async (username,password) => {
  try {
    const res = await put(`/auth/signup`, {name: username, password: password})
    if (res.status === 422) {
      throw new Error(
        'Validation failed. Make sure the email address isn\'t used yet!'
      )
    }
    if (res.status !== 200 && res.status !== 201) {
      console.log('Error!')
      throw new Error('Creating a user failed!')
    }
    return true
  }
  catch (err) {
    throw (err)
  }

}
export const login = async (username,password) => {
  try {
    let res = await post('/auth/login', {name: username, password: password})
    if (res.status === 422) {
      throw new Error('Not a member of ChatBox')
    }
    if (res.status === 401) {
      throw new Error('Wrong password')
    }
    if (res.status !== 200 && res.status !== 201) {
      console.log('Error!', res.status)
      throw new Error('Could not authenticate you!')
    }
    return res.json()
  }
  catch (err) {
    throw (err)
  }

}

export const autoLogin = async (token) => {
  try {
    let res = await post('/auth/autologin', {}, {Authorization: 'Bearer ' + token})
    if (res.status === 401) {
      throw new Error('Validation failed.')
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Could not authenticate you!')
    }
    return res.json()
  }
  catch (err) {
    throw (err)
  }

}
export const getMessages = async (username,from,token) => {
  try {
    let resData
    let  res = await get(`/messages/${username}/${from}`,{Authorization: 'Bearer ' + token})
    if(res.status === 401){
      const error = new Error('unauthorized')
      throw error
    }
    resData = await res.json()
    if(!resData.messages){

      return []
    }
    return JSON.parse('[' + resData.messages.join(',') + ']').reverse()
  }
  catch (err) {
    throw (err)
  }
}

