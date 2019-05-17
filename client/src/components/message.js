import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'
const Message = (props)=>(
  <div className="row mt-1 " >
    <div className="col-xs-2 ml-2">
      {props.itsMe?<i
          className="far fa-user mt-2 "
          style={{"fontSize":40}}></i>:
        <i className="fas fa-user-ninja mt-2 "
           style={{"fontSize":40}}></i>}

    </div>
    <div className="col-xs-12 ">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className={"font-weight-bold text-monospace ml-2 d-inline-block"}
               style={{"fontSize":12}}>{props.messageFrom}</p>
            <p className={"text-muted ml-1 font-italic d-inline-block"}
               style={{"fontSize":12}}>{moment(Number(props.messageTime)).fromNow()}</p>
          </div></div>
        <div className="row"> <div className="col">
          <p style={{"fontSize":12}}>{props.messageContent}</p>
        </div>
        </div>
      </div></div>
    <hr style={{width:"80%"}}/>
  </div>
)

Message.propTypes ={
  messageFrom:PropTypes.string,
  messageTime:PropTypes.string,
  messageContent:PropTypes.string,
  itsMe:PropTypes.bool
}


export default Message
