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
    // alert(this.props.isAuth)
    if (this.props.isAuth) {
      //  this.props.setAuth(true)
      this.props.history.push('/')
    } else {
      this.props.history.push('/login')
      //  this.props.setAuth(false)
    }
  }

  componentDidMount () {
    //localStorage.removeItem('token');
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
// component={this.props.isAuth ? ChatUi : null}/>
  // render(){
  //   return (
  //     <div className="App">
  //       <Login />
  //
  //     </div>
  //   );
  // }

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

