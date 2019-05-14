import React, { Component } from 'react'
import SidePanel from '../components/sidePanel'
import MessagesArea from '../components/messagesArea'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

class ChatUi extends Component {
  state = {
    messageInput: ''
  }
  msgBoxRef = {}
  handleLogout = async () => {
    //alert("logout")
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
  getMsgBoxRef = (node) => {
    this.msgBoxRef = node
  }
  componentDidUpdate = () => {
    this.msgBoxRef.scrollTop = this.msgBoxRef.scrollHeight
  }

  render () {

    return (
      <div className="row" style={{width: '100vw'}}>
        <div className="col side-panel">
          <SidePanel activeChat={this.props.activeChat}
                     onUserClick={this.handelUserClick}
                     onLogout={this.handleLogout}
                     users={this.props.usersList}
                     username={this.props.currentUser}/>
        </div>
        <div className="col-9" style={{'backgroundColor': '#eee'}}>
          {this.props.activeChat !== '' ?
            <MessagesArea messages={this.props.messages}
                          activeChat={this.props.activeChat}
                          onMessageChanged={this.handleMessageChange}
                          onSendMessage={this.handleSendMessage}
                          currentUser={this.props.currentUser}
                          inputText={this.state.messageInput}
                          msgBoxRef={this.getMsgBoxRef}
            /> : null}

        </div>
      </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    usersList: state.chat.users,
    currentUser: state.auth.username,
    messages: state.chat.messages,
    activeChat: state.chat.activeChat
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logOut()),
    sendMessage: (message) => dispatch(actions.sendMessage(message)),
    getMessages: (from) => dispatch(actions.getMessages(from)),
    setActiveChat: (activeChat) => dispatch(actions.setActiveChat(activeChat)),
    setPendingMessage: (from, pending) => dispatch(actions.setPendingMessage(from, pending))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUi)

