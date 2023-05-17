import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar__links">
          <Link className="navbar__link" to="/shipments">
            Shipments
          </Link>
          <Link className="navbar__link" to="/senders">
            Senders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
