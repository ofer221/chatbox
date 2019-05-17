import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class Login extends Component {
  state = {
    isSignup: false,
    username: '',
    password: '',
    rePassword: '',
  }

  toggleLogin = () => {
    this.props.setSignup(!this.props.isSignup)
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const {username,password} = this.state

    if (this.props.isSignup) {
      if( this.validateForm(false)){
        this.props.signup(username,password)
      }
    }
    else {
      if( this.validateForm(true)){
        this.props.login(username,password).then(()=>{
          this.props.authStateChanged()
        })
      }


    }
  }
  validateForm = (isLogin)=>{
    let error=""
    const {username,password,rePassword} = this.state
    if(password==="" ||  username === ""){
      error = "All fields are required"
    }
    else if (!isLogin && rePassword!==password){
      error="The two passwords do not match"
    }

    if(error!==""){
      this.props.setLoginError(error)
      return false
    }
    else {
      return true
    }
  }

  render () {
    return (
      <div className="container  ">

        <div className={'row'}>

          <div className={'center-form'}>

            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <p className={'home-logo text-center mt-4 text-muted'}><i className="fas fa-cube"></i> ChatBox</p>
              {/*<i className="fas fa-cube"></i><h2>ChatBox</h2>*/}
              <form onSubmit={this.handleSubmit}>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                  </div>
                  <input name="username"
                         className="form-control"
                         placeholder="Username"
                         type="text"
                         onChange={this.handleChange}/>
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                  </div>
                  <input name={'password'}
                         className="form-control"
                         placeholder="Password"
                         type="password"
                         onChange={this.handleChange}/>
                </div>
                {this.props.isSignup &&
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                  </div>
                  <input name={'rePassword'}
                         className="form-control"
                         placeholder="Repeat password"
                         type="password"
                         onChange={this.handleChange}/>
                </div>
                }

                <div className="form-group">
                  <button type="submit"
                          className="btn btn-primary btn-block"> {this.props.isSignup ? 'Create Account' : 'Log In'}</button>
                </div>
              </form>
              <p className="text-center my-0" style={{"fontSize":"0.8rem",color:"red"}}>{this.props.loginError}</p>
              <br/>
              <p className="text-center">
                {this.props.isSignup ? 'Have an account?' : 'Don\'t have an account?'}
                <button className={'btn btn-link mb-1'}
                        onClick={this.toggleLogin}>
                  {this.props.isSignup ? 'Log In' : 'Signup'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    isSignup: state.ui.isSignup,
    loginError:state.ui.loginError
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setSignup: (isSignup)=> dispatch(actions.setSignup(isSignup)),
    login:(username,password)=>dispatch(actions.login(username,password)),
    signup:(username,password)=>dispatch(actions.signUp(username,password)),
    setLoginError:(errorMsg)=>dispatch(actions.setLoginError(errorMsg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
