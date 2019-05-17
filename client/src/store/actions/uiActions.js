import *as actionTypes from '../actionTypes'

export const startLoading = () => {
  return {
    type: actionTypes.UI_START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: actionTypes.UI_STOP_LOADING,
  };
};
export const setSignup = isSignup => {
  return {
    type: actionTypes.IS_SIGNUP,
    isSignup:isSignup
  };
};
export const setLoginError = error => {

  return {
    type: actionTypes.UI_SET_LOGIN_ERROR,
    error:error
  };
};
export const setMobileView = isMobile => {
  return {
    type: actionTypes.SET_MOBILE_VIEW,
    isMobile:isMobile
  };
};
export const setChatError = error => {
  return {
    type: actionTypes.UI_SET_CHAT_ERROR,
    error:error
  };
};
