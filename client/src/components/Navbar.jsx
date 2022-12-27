import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar  bg-dark  d-flex justify-content-between ">
      <Link to="/" className="nav-link text-white fs-4">
        Home
      </Link>
      <Link to="/login" className="nav-link text-white fs-4">
        Login
      </Link>
      <Link to="/register" className="nav-link text-white fs-4">
        Register
      </Link>
    </div>
  );
};

export default Navbar;
