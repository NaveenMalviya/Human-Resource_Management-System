import React from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // to get the current path

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        {/* <h1>HRMS</h1> */}
        <img src="h../../../../../assets/HRMS Logo.png" alt="IMG-LOGO" />
      </div>

      <div className="menu-desktop">
        <ul className="main-menu">
          {localStorage.getItem("role") === "user" ? (
            <>
              <li>
                <Link
                  to="/user"
                  className={`nav-item ${location.pathname === "/user" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/employee"
                  className={`nav-item ${location.pathname === "/employee" ? "active" : ""}`}
                >
                  Employee
                </Link>
              </li>
              <li>
                <Link
                  to="/candidate"
                  className={`nav-item ${location.pathname === "/candidate" ? "active" : ""}`}
                >
                  Candidate
                </Link>
              </li>
              {/* <li ><Link to="/events" className="nav-item">Events</Link></li>
              <li ><Link to="/meeting" className="nav-item">Meetings</Link></li>
              <li ><Link to="/codebank" className="nav-item">CodeBank</Link></li>
              <li  ><Link to="/recruitment" className="nav-item">Recruitment</Link></li>
              <li ><Link to="/advanced-search" className="nav-item">Searching</Link></li>
              <li ><Link to="/candidate_listing" className="nav-item">Candidate Listing</Link></li> */}
              <li>
                <Link
                  to="/helpcenter"
                  className={`nav-item ${location.pathname === "/helpcenter" ? "active" : ""}`}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/expenses"
                  className={`nav-item ${location.pathname === "/expenses" ? "active" : ""}`}
                >
                  Expenses
                </Link>
              </li>
              <li>
                <Link
                  to="/consultancy"
                  className={`nav-item ${location.pathname === "/consultancy" ? "active" : ""}`}
                >
                  Consultancy
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className={`nav-item ${location.pathname === "/skills" ? "active" : ""}`}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  to="/profiles"
                  className={`nav-item ${location.pathname === "/profiles" ? "active" : ""}`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item" onClick={logout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/admin"
                  className={`nav-item ${location.pathname === "/admin" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-user"
                  className={`nav-item ${location.pathname === "/admin-user" ? "active" : ""}`}
                >
                  User
                </Link>
              </li>
              <li>
                <Link
                  to="/changepassword"
                  className={`nav-item ${location.pathname === "/changepassword" ? "active" : ""}`}
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  to="/edit-profile"
                  className={`nav-item ${location.pathname === "/edit-profile" ? "active" : ""}`}
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-about"
                  className={`nav-item ${location.pathname === "/admin-about" ? "active" : ""}`}
                >
                  About
                </Link>
              </li>
              <li className="nav-item" onClick={logout}>
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
