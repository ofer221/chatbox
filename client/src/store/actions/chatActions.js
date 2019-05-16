import *as actionTypes from '../actionTypes'
import * as restApi from '../../serverApi/restApi'
import {setAuth} from './authActions'

export const updateUsers = users => {
  let usersArr = []
  if (users.length !== 0) {
    usersArr = users.map((name, index) => {
      return {username: name, pending: 0}
    })
  }
  return {
    type: actionTypes.SET_USERS,
    users: usersArr,
  }
}
export const sendMessage = message => {
  return (dispatch,getState) =>{
    const {socket} = getState().auth
    message.time = Date.now().toString()
    let messages = JSON.parse(localStorage.getItem(message.to))
    if (messages) {
      messages.push(message)
    } else {
      messages = [message]

    }
    localStorage.setItem(message.to, JSON.stringify(messages))
    socket.emit('msg', message)
    dispatch(addMessage(message))
  }

}
export const addMessage = (message) =>{
  return {
    type: actionTypes.SEND_MESSAGE,
    message: message,
  }
}
export const getMessages = (from) => {
  return async (dispatch,getState) => {
    try {
      const {username,token} = getState().auth
      let messages = JSON.parse(localStorage.getItem(from))
      if (!messages) {
        messages = await restApi.getMessages(username,from,token)
        localStorage.setItem(from, JSON.stringify(messages))
      }
      dispatch(fetchMessages(messages))
    } catch (err) {
      if (err.message === 'unauthorized'){
        dispatch(setAuth({
          authState: false,
          username: '',
          token: '',
          socket: {}
        }))
      }
      console.log(err)
    }

  }
}
export const fetchMessages = (messages) => {
  return {
    type: actionTypes.GET_MESSAGES,
    messages: messages || []
  }
}
export const setActiveChat = (activeChat) => {

  return {
    type: actionTypes.SET_ACTIVE_CHAT,
    activeChat: activeChat
  }
}
export const handleNewMessage = (from) => {
  return (dispatch,getState) => {
    const {activeChat} = getState().chat
    if (activeChat === from) {
      dispatch(getMessages(from))
    } else {
      dispatch(setPendingMessage(from, 1))
    }
  }
}
export const setPendingMessage = (from, pending) => {
  return {
    type: actionTypes.SET_PENDING_MESSAGE,
    from: from,
    pending: pending
  }
}




