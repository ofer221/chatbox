import *as actionTypes from '../actionTypes'
import * as ServerApi from '../../serverApi/serverApi'
import store from '../store'

export const updateUsers = users => {
  let usersArr =[]
  if(users){

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
  const {socket} = store.getState().auth
  message.time = Date.now().toString()
  let messages = JSON.parse(localStorage.getItem(message.to))
  if (messages) {
    messages.push(message)
  } else {
    messages = [message]

  }
  localStorage.setItem(message.to, JSON.stringify(messages))
  socket.emit('msg', message)
  return {
    type: actionTypes.SEND_MESSAGE,
    message: message,
  }
}
export const getMessages = (from) => {
  let messages = JSON.parse(localStorage.getItem(from))
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
  return dispatch => {
    const {activeChat} = store.getState().chat
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
export const getUsers = (username, password) => {
  return dispatch => {
    ServerApi.get('/users/userslist').then(res => {
      if (res.length !== 0) {
        dispatch(updateUsers(res))
      }
    })
      .catch(err => {
        console.log(err)
      })
  }
}


