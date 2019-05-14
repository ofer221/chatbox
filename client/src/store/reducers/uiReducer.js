import * as actionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  isSignup:false,
  loginError:""
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.UI_START_LOADING) {
    return startLoading(state, action)
  }
  else if (action.type === actionTypes.UI_STOP_LOADING) {
    return stopLoading(state, action)
  }
  else if (action.type === actionTypes.IS_SIGNUP) {
    return setSignup(state, action.isSignup)
  }
  else if (action.type === actionTypes.UI_SET_LOGIN_ERROR) {
    return setLoginError(state, action.error)
  }
  else {
    return state
  }
}

function startLoading (state, action) {
  return {
    ...state,
    isLoading: true
  }
}
function stopLoading (state, action) {
  return {
    ...state,
    isLoading: false
  }
}
function setSignup (state, isSignup) {
  return {
    ...state,
    isSignup: isSignup,
    loginError:""
  }
}
function setLoginError (state, error) {
  return {
    ...state,
    loginError: error
  }
}
export default reducer
