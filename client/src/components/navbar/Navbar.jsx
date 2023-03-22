import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightFromBracket}from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SmartBooking</span>
        </Link>
        {user ? (
          <div className="navItems">
            <p>Hola, {user.username}!😀</p>
            <div  className="imgUser"><img src={user.img} alt="" /></div>
            <button className="navButton1" tittle="Logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton2">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton3">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
