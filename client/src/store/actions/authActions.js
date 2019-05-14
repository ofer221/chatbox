import io from 'socket.io-client'
import *as actionTypes from '../actionTypes'
import * as ServerApi from '../../serverApi/serverApi'
import * as uiActions from './uiActions'
import * as chatActions from './chatActions'
import store from '../store'
export const setAuth = authData => {
  return {
    type: actionTypes.SET_AUTH,
    authData: authData,
  }
}
export const logOut = () => {
  const {socket} = store.getState().auth
  socket.emit("logout")
  return dispatch => {
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
  return dispatch => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.setLoginError(''))
    ServerApi.put(`/auth/signup`, {name: username, password: password})
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            'Validation failed. Make sure the email address isn\'t used yet!'
          )
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!')
          throw new Error('Creating a user failed!')
        }
        dispatch(uiActions.stopLoading())
        dispatch({type: actionTypes.IS_SIGNUP, isSignup: false})
      })
      .catch(err => {
        dispatch(uiActions.stopLoading())
        dispatch(uiActions.setLoginError(err.message))
      })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      dispatch(uiActions.startLoading())
      dispatch(uiActions.setLoginError(''))
      let res = await ServerApi.post('/auth/login', {name: username, password: password})
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
      const resData = await res.json()
      const token = resData.token
      localStorage.setItem('token', token)
      // console.log(resData)
      SocketConnection(resData,users=>{
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
      let res = await ServerApi.post('/auth/autologin', {}, {Authorization: 'Bearer ' + token})
      if (res.status === 401) {
        throw new Error('Validation failed.')
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!', res.status)
        throw new Error('Could not authenticate you!')
      }
      const resData = await res.json()

      SocketConnection(resData,users=>{
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

const SocketConnection=(loginData,updateUsers,setuser,handleMessage)=>{

const socket = io(window.location.origin)
  //const socket = io("http://localhost:5000")
  setuser(socket)


  socket.on('users', (data) => {

    let users = JSON.parse(data)
    updateUsers(users)
  })
  socket.on('new_message', (data) => {
    let message = JSON.parse(data)

    let messages = JSON.parse(localStorage.getItem(message.from))
    if (messages) {

      messages.push(message)
    } else {
      messages = [message]

    }
    localStorage.setItem(message.from, JSON.stringify(messages))
    handleMessage(message.from)
  })
  socket.emit('logged_in', {username: loginData.username})
  updateUsers(loginData.users)
  localStorage.setItem('username', loginData.username)
}
