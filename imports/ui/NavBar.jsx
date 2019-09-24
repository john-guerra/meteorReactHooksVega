import React from "react";
// import PropTypes from "prop-types";

import AccountsUIWrapper from "./AccountsUIWrapper";

const NavBar = () => {
  return (
    <div className="NavBar">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Voting!!!!
        </a>

        <AccountsUIWrapper></AccountsUIWrapper>
      </nav>
    </div>
  );
};

NavBar.propTypes = {};

export default NavBar;
