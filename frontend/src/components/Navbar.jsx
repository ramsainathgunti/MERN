import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log("USer=", user);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="nav-logo">Hotel booking App</span>
        </Link>

        <div className="navItems">
          <div className="navUser">
            <PersonIcon /> {user.username}
          </div>

          <button className="navLogout" onClick={handleClick}>
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
