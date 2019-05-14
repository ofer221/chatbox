import * as actionTypes from '../actionTypes'

const initialState = {
  token:"",
  username:"",
  isAuth:false,
  socket:{}
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_AUTH) {

    return setAuth(state, action.authData)
  }
  else {
    return state
  }
}

function setAuth (state,authData) {
  return {

    token:authData.token,
    username:authData.username,
    isAuth: authData.authState,
    socket:authData.socket
  }
}

export default reducer
