import React from 'react'

const SidePanel = (props) => (
  <div className="container">
    <div className="row">
      <div className="col">
        <p className={'side-logo text-center mt-4'}><i
          className="fas fa-cube"></i> ChatBox</p>
        <div className="dropdown">
          <button className="dropbtn"><i className="fas fa-user mr-3"></i>{props.username}<i
            className="fas fa-angle-down ml-3"></i>
          </button>
          <div className="dropdown-content">
            <div style={{cursor: 'pointer'}}
                 onClick={props.onLogout}>Log Out<i
              className="ml-3 fas fa-sign-out-alt"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <p className={'mt-3 font-weight-bold text-white text-muted'}>Online users list</p>
    </div>
    {props.users.map((user, index) => {
        return (props.username !== user.username) && (<div
          className={props.activeChat === user.username ? 'active row user-list-item ml-1 ' : 'row user-list-item ml-1 '}
          onClick={() => props.onUserClick(user.username)}
          key={index}>{props.activeChat === user.username ? <i className="fas fa-user-ninja mr-3 pt-1 mb-3 my-auto"></i> :
          <i className="far fa-user mr-3 pt-1 mb-3 my-auto"></i>}{user.username}
          {user.pending !== 0 ?
            <label className="badge badge-pill badge-warning ml-auto">{user.pending}</label> : null} </div>)
      }
    )}

  </div>

)

export default SidePanel
