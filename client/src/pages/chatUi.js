import React, { Component } from 'react'
import SidePanel from '../components/sidePanel'
import MessagesArea from '../components/messagesArea'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class ChatUi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messageInput: '',
      mobileActiveChat: false,
      screenWidth: 0,
      screenHeight: 0
    }

  }

  msgBoxRef = {}
  handleLogout = async () => {
    await this.props.logout()
    this.props.authStateChanged()
  }
  handelUserClick = (username) => {

    this.toggleActiveChat(username)
    this.props.getMessages(username)
  }

  toggleActiveChat = username => {
    this.props.setActiveChat(username)
    this.props.setPendingMessage(username, 0)
    this.setState((prevState) => {
      return {...prevState, messageInput: ''}
    })

  }
  handleMessageChange = event => {
    let value = event.target.value

    this.setState((prevState) => {
      return {...prevState, messageInput: value}
    })
  }
  handleSendMessage = () => {
    if (this.state.messageInput !== '') {
      this.props.sendMessage({
        from: this.props.currentUser,
        to: this.props.activeChat,
        content: this.state.messageInput,
        time: ''
      })
      this.setState((prevState) => {
        return {...prevState, messageInput: ''}
      })
    }
  }
  handleBackClick = () =>{
    this.props.setActiveChat('')
  }
  getMsgBoxRef = (node) => {
    this.msgBoxRef = node
  }
  componentDidUpdate = () => {
    if(this.msgBoxRef){
      this.msgBoxRef.scrollTop = this.msgBoxRef.scrollHeight
    }
  }
  componentDidMount = () => {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions = () => {
    console.log(window.innerWidth)
    if (window.innerWidth > 610) {
      this.props.setMobileView(false)
    } else {
      this.props.setMobileView(true)
    }
    // this.setState((prevState) => {
    //   return {...prevState, width: window.innerWidth, height: window.innerHeight}
    // })
  }
  rendeeSidePanel = (cols) => {
    return (<div className={`col-${cols} side-panel`}>
      <SidePanel activeChat={this.props.activeChat}
                 onUserClick={this.handelUserClick}
                 onLogout={this.handleLogout}
                 users={this.props.usersList}
                 username={this.props.currentUser}
                 isMobile={this.props.isMobile}/>
    </div>)
  }
  renderMessagesArea = (cols) => {
    return (<div className={`col-${cols}`} style={{'backgroundColor': '#eee'}}>
      {this.props.activeChat !== '' &&
      <MessagesArea messages={this.props.messages}
                    activeChat={this.props.activeChat}
                    onMessageChanged={this.handleMessageChange}
                    onSendMessage={this.handleSendMessage}
                    currentUser={this.props.currentUser}
                    inputText={this.state.messageInput}
                    msgBoxRef={this.getMsgBoxRef}
                    isMobile={this.props.isMobile}
                    onBackClick={this.handleBackClick}
      />}
    </div>)
  }
  responsive = () => {
    let displayComponent
    if (this.props.isMobile) {
      if (this.props.activeChat === '') {
        displayComponent = this.rendeeSidePanel('12')
      }
      else {
        displayComponent = this.renderMessagesArea('12')
      }
      return <div className="row chatUi" style={{width: '100vw',padding:0,margin:0}}>
        {displayComponent}
      </div>
    }
    else {
      return <div className="row " style={{width: '100%',padding:0,margin:0}}>
        {this.rendeeSidePanel('4')}{this.renderMessagesArea('8')}
      </div>
    }
  }

  render () {
    if (!this.props.isAuth) {
      this.props.authStateChanged()
    }
    return (
      <div className="row chatUi" style={{width: '100vw',padding:0,margin:0}}>
        {this.responsive()}

      </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    usersList: state.chat.users,
    currentUser: state.auth.username,
    messages: state.chat.messages,
    activeChat: state.chat.activeChat,
    isMobile: state.ui.isMobile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logOut()),
    sendMessage: (message) => dispatch(actions.sendMessage(message)),
    getMessages: (from) => dispatch(actions.getMessages(from)),
    setActiveChat: (activeChat) => dispatch(actions.setActiveChat(activeChat)),
    setPendingMessage: (from, pending) => dispatch(actions.setPendingMessage(from, pending)),
    setMobileView: (isMobile) => dispatch(actions.setMobileView(isMobile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUi)

