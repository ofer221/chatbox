import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import uiReducer from './reducers/uiReducer'
import authReducer from './reducers/authReducer'
import chatReducer from './reducers/chatReducer'

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  chat: chatReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
