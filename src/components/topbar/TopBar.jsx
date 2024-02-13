import "./topbar.css"
import {Link} from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF ="http://localhost:5000/images/"; //5000 port is for backend and 3000 is for frontend.


  const handleLogout = () => {
dispatch({type: "LOGOUT"})
  }

  return (
    <div className="top">
    <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>

    <div className="topCenter">
        <ul className="topList">
            <li className="topListItem">
              <Link to="/" className="link">HOME</Link>
            </li>

            <li className="topListItem">
            <Link to="/" className="link">ABOUT</Link>
            </li>

            <li className="topListItem">
            <Link to="/" className="link">CONTACT</Link>
            </li>

            <li className="topListItem">
            <Link to="/write" className="link">WRITE</Link>
            </li>

            <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>

        </ul>
    </div>

    <div className="topRight">
      {
        user ? (
          <Link to="/settings">
          <img className="topImg" src={PF+user.profilePic}/>
          </Link>
        ) : (
          <ul className="topList">
          <li className="topListItem">
<Link to="/login" className="link">LOGIN</Link></li>
<li className="topListItem">
<Link to="/register" className="link">REGISTER</Link>
</li>
</ul>
  )}

  <i className="topSearchIcon fas fa-search"></i>
    </div>
  </div>
  )
}
