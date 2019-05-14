import React, { Component } from 'react'
import Login from './pages/login'
import ChatUi from './pages/chatUi'
import {Switch, Route,  } from 'react-router-dom'
import './App.css'
import * as actions from './store/actions'
import { connect } from 'react-redux'
import Spinner from './components/spinner'

class App extends Component {
  state = {
    auth: false
  }
  onAuthStateChanged = () => {
    if (this.props.isAuth) {
      this.props.history.push('/')
    } else {
      this.props.history.push('/login')
    }
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.autoLogin(token).then(() => {
        this.onAuthStateChanged()
      })
    }
    this.onAuthStateChanged()
  }

  render () {

    return (
      (this.props.isLoading ) ? <Spinner/> :
        <Switch>
          <Route exact path="/" render={(props) => <ChatUi {...props} authStateChanged={this.onAuthStateChanged}/>}/>
          <Route path="/login" render={(props) => <Login {...props} authStateChanged={this.onAuthStateChanged}/>}/>
        </Switch>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    isLoading: state.ui.isLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAuth: (authState) => dispatch(actions.setAuth(authState)),
    autoLogin: (token) => dispatch(actions.autoLogin(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

