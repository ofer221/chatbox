import * as actionTypes from '../actionTypes'
import produce from 'immer'

const initialState = {
  users: [],
  messages: [],
  activeChat: ''
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_USERS) {
    return updateUsers(state, action.users)
  }
  else if (action.type === actionTypes.SEND_MESSAGE) {
    return sendMessage(state, action.message)
  }
  else if (action.type === actionTypes.GET_MESSAGES) {
    return getMessages(state, action.messages)
  }
  else if (action.type === actionTypes.SET_PENDING_MESSAGE) {
    return setPendingMessage(state, action.from, action.pending)
  }
  else if (action.type === actionTypes.SET_ACTIVE_CHAT) {
    return setActiveChat(state, action.activeChat)
  }
  else {
    return state
  }
}

function updateUsers (state, users) {
  const nextState = produce(state, draftState => {
    let filteredUsers = draftState.users.filter(filterUser => {
      return (users.findIndex((user => user.username === filterUser.username)) !== -1)
    })
    draftState.users = uniqueConcat(filteredUsers.concat(users))
  })

  return {
    ...state,
    users: nextState.users,

  }
}

function setPendingMessage (state, from, pending) {
  const nextState = produce(state, draftState => {
    let userIndex = draftState.users.findIndex((user => user.username === from))
    if (pending === 0) {
      draftState.users[userIndex].pending = 0
    } else {
      draftState.users[userIndex].pending += 1
    }
  })
  return {
    ...state,
    users: nextState.users
  }
}

function setActiveChat (state, activeChat) {
  return {
    ...state,
    activeChat: activeChat
  }
}

function sendMessage (state, message) {
  return {
    ...state,
    messages: state.messages.concat([message])
  }
}

function getMessages (state, messages) {
  return {
    ...state,
    messages: messages
  }
}

function uniqueConcat (mergedArray) {
  let updatedArray = mergedArray.concat()
  for (let i = 0; i < updatedArray.length; ++i) {
    for (let j = i + 1; j < updatedArray.length; ++j) {
      if (updatedArray[i].username === updatedArray[j].username) {
        updatedArray.splice(j--, 1)
      }
    }
  }
  return updatedArray
}

export default reducer
