import React from 'react'
import PropTypes from 'prop-types'

const UserDropDown = (props) => (
  <div className={"dropdown ml-2 float-left "+(props.isMobile&&'mt-2')}>
    <button className="dropbtn"><i className="fas fa-user mr-3"></i>{!props.isMobile&&props.username}<i
      className="fas fa-angle-down ml-3"></i>
    </button>
    <div className="dropdown-content">
      <div style={{cursor: 'pointer'}}
           onClick={props.onLogout}>Log Out<i
        className="ml-3 fas fa-sign-out-alt"></i></div>
    </div>
  </div>)

UserDropDown.propTypes = {
  username: PropTypes.string,
  onLogout: PropTypes.func,
  isMobile: PropTypes.bool
}

export default UserDropDown
