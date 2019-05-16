import React from 'react'
import PropTypes from 'prop-types'
import Message from './message'
import Error from './error'
const MessagesArea = (props) => (
  <div className="container chat-panel">
    <div className="row ">
      <div className="col-12 mt-3 chat-header">
        <p className={'mt-3'}>Chatting with <i className="fas fa-long-arrow-alt-right mr-2"></i>{props.activeChat}</p>
      </div>
    </div>
    <div className="row ">
      <div className="col-12 mt-3 chat-area " ref={props.msgBoxRef}>
        {props.messages.map((message, index) =>
          <Message key={index}
                   messageFrom={message['from']}
                   messageContent={message['content']}
                   messageTime={message['time']}
                   itsMe={props.currentUser === message['from']}/>
        )}

      </div>
    </div>
    <div className="row ">
      <div className="input-group mb-3 mt-5">
        <input type="text"
               className="form-control"
               onChange={props.onMessageChanged}
               aria-label="Example text with button addon"
               aria-describedby="button-addon1"
               value={props.inputText}
        />
        <div className="input-group-append">
          <button onClick={props.onSendMessage}
                  className="btn btn-outline-primary"
                  type="button"
                  id="button-addon1">Send
          </button>
        </div>

      </div>
    </div>
    <Error/>
  </div>

)

MessagesArea.propTypes = {
  onSendMessage: PropTypes.func,
  onMessageChanged: PropTypes.func,
  activeChat: PropTypes.string,
  messages: PropTypes.array,
  currentUser: PropTypes.string,
  inputText: PropTypes.string,
  msgBoxRef: PropTypes.func
}

export default MessagesArea
