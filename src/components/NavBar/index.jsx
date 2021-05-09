import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenuClick = () => setShowMenu(true);
  const handleHideMenuClick = () => setShowMenu(false);

  return (
    <div className="navbar">
      <div
        className={`navbar-close-icon-container ${showMenu ? " show" : ""}`}
        onClick={handleHideMenuClick}
      >
        <span className="material-icons navbar-close-icon">close</span>
      </div>

      <div className="navbar__left">
        <p className="heading-4 navbar__logo">DevKart</p>

        <div className={`navbar__link-container ${showMenu ? " show" : ""}`}>
          <li>
            <NavLink
              className="navbar__link"
              activeClassName="navbar__link-active"
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar__link"
              activeClassName="navbar__link-active"
              to="/cart"
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar__link"
              activeClassName="navbar__link-active"
              to="/wishlist"
            >
              WishList
            </NavLink>
          </li>
        </div>
      </div>

      <div className="navbar__right">
        <div className="menu-icon" onClick={handleShowMenuClick}>
          <span className="material-icons">menu</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
