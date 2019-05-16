import *as actionTypes from '../actionTypes'
import * as uiActions from './uiActions'
import * as chatActions from './chatActions'
import * as socketClient from '../../serverApi/socketClient'
import * as restApi from '../../serverApi/restApi'


export const setAuth = authData => {
  return {
    type: actionTypes.SET_AUTH,
    authData: authData,
  }
}
export const logOut = () => {
  return (dispatch,getState) => {
    const {socket} = getState().auth
    socket.emit("logout")
    dispatch(setAuth({
      authState: false,
      username: '',
      token: '',
      socket: {}
    }))
    localStorage.removeItem('token')
  }
}

export const signUp = (username, password) => {
  return async dispatch => {
    try {
      dispatch(uiActions.startLoading())
      dispatch(uiActions.setLoginError(''))
      await restApi.signup(username,password)
      dispatch(uiActions.stopLoading())
      dispatch({type: actionTypes.IS_SIGNUP, isSignup: false})

    }catch (err) {
      dispatch(uiActions.stopLoading())
      dispatch(uiActions.setLoginError(err.message))
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      dispatch(uiActions.startLoading())
      dispatch(uiActions.setLoginError(''))
      const resData = await restApi.login(username,password)
      const token = resData.token
      localStorage.setItem('token', token)
      socketClient.handleConnection(resData,users=>{
        dispatch(chatActions.updateUsers(users))
      },(socket)=>{
        dispatch(setAuth({
          authState: true,
          username: username,
          token: token,
          socket: socket
        }))
      },(from)=>{
        dispatch(chatActions.handleNewMessage(from))
      })
      dispatch(uiActions.stopLoading())
    } catch (err) {
      dispatch(uiActions.stopLoading())
      dispatch(uiActions.setLoginError(err.message))
    }

  }
}
export const autoLogin = (token) => {
  return async dispatch => {
    try {
      dispatch(uiActions.startLoading())
      const resData = await restApi.autoLogin(token)
      socketClient.handleConnection(resData,users=>{
        dispatch(chatActions.updateUsers(users))
      },(socket)=>{
        dispatch(setAuth({
          authState: true,
          username: resData.username,
          token: token,
          socket: socket
        }))
      },(from)=>{
        dispatch(chatActions.handleNewMessage(from))
      })
      dispatch(uiActions.stopLoading())
    } catch (e) {
      dispatch(uiActions.stopLoading())
      console.log(e)
    }

  }

}


