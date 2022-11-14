import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";
import { logout } from "../../context/authContext/authActions";

export default function Topbar() {
  const history = useHistory()
  const {dispatch, user: userInfo} = useContext(AuthContext)

  function setClicked() {
    dispatch(logout())
    history.push('/login')
}

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/"
          style={{
            textDecoration: 'none',
          }}
          >
          <span className="logo">Spark</span>
          </Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
          <button className='logout-button' onClick={setClicked}>Log Out</button>
        </div>
      </div>
    </div>
  );
}
