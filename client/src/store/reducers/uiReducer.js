import * as actionTypes from '../actionTypes'

const initialState = {
  isLoading: false,
  isSignup:false,
  loginError:"",
  chatError:"",
  isMobile:false
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
  else if (action.type === actionTypes.UI_SET_CHAT_ERROR) {
    return setChatError(state, action.error)
  }
  else if (action.type === actionTypes.SET_MOBILE_VIEW) {
    return setMobileView(state, action.isMobile)
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
function setChatError (state, error) {
  return {
    ...state,
    chatError: error
  }
}

function setMobileView (state, isMobile) {
  return {
    ...state,
    isMobile: isMobile
  }
}
export default reducer
