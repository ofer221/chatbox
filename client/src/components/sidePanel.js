import React from 'react'
import UserDropDown from './userDropDown'
import PropTypes from 'prop-types'

const SidePanel = (props) => (
  <div className="container">
    <div className="row">
      <div className="col">
        {props.isMobile && <UserDropDown isMobile={props.isMobile}
                                         username={props.username}
                                         onLogout={props.onLogout}/>}
        <p className={'side-logo text-center mt-4 mx-2 ' + (props.isMobile && 'mr-5 pr-3')}><i
          className="fas fa-cube"></i> ChatBox</p>

        {!props.isMobile && <UserDropDown isMobile={props.isMobile}
                                          username={props.username}
                                          onLogout={props.onLogout}/>}

      </div>
    </div>
    <div className={'row ml-2 ' + (props.isMobile && 'justify-content-center')}>
      <p className={'mt-3 font-weight-bold text-white text-muted '}>Online users list</p>

    </div>
    {props.isMobile && <hr/>}
    {props.users.map((user, index) => {
        return (props.username !== user.username) && (<div className={props.activeChat === user.username ?
          'active row user-list-item ml-1 ' + (props.isMobile && 'justify-content-center')
          : 'row user-list-item ml-1 ' + (props.isMobile && 'justify-content-center')}
                                                           onClick={() => props.onUserClick(user.username)}
                                                           key={index}>{props.activeChat === user.username ? <i
            className="fas fa-user-ninja mr-3 pt-1 mb-3 my-auto"></i> :
          <i className="far fa-user mr-3 pt-1 mb-3 my-auto"></i>}{user.username}
          {user.pending !== 0 &&
          <label
            className={'badge badge-pill badge-warning ' + (props.isMobile ? 'ml-4' : 'ml-auto')}>{user.pending}</label>} </div>)
      }
    )}

  </div>

)
SidePanel.propTypes = {
  pending: PropTypes.number,
  username: PropTypes.string,
  activeChat: PropTypes.string,
  onLogout: PropTypes.func,
  onUserClick: PropTypes.func,
  isMobile: PropTypes.bool,

}
export default SidePanel
