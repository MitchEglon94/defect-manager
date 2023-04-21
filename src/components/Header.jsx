import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AddDefectModal from "./AddDefectModal";
import { logout } from "../features/user/userSlice";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const [isActive, setIsActive] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const menuClickHandler = () => {
    setIsActive(!isActive);
  };
  const modalHandler = (defectInfo) => {
    setActivateModal(!activateModal);
  };

  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => {
          navigate("/home");
        }}
      >
        FIX
      </div>
      {user && (
        <div className="report-defect-button" onClick={() => modalHandler()}>
          Report Defect
        </div>
      )}
      {!user && (
        <div
          className="report-defect-button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </div>
      )}
      {!user && (
        <div
          className="report-defect-button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </div>
      )}
      {user && (
        <div
          className="report-defect-button"
          onClick={() => dispatch(logout())}
        >
          Logout
        </div>
      )}
      {activateModal && <AddDefectModal fn={modalHandler} />}
      <FontAwesomeIcon icon={faBars} onClick={() => menuClickHandler()} />
      <div className={`menu-popout ${isActive ? "is-active" : ""}`}>
        <FontAwesomeIcon
          className="burger-btn-popout-menu"
          icon={faBars}
          onClick={() => menuClickHandler()}
        />
        <ul className="popout-menu-list">
          <li>Home</li>
          <li>Defects</li>
          <li>History</li>
        </ul>
        <div
          className="report-defect-button menu-btn"
          onClick={() => {
            modalHandler();
            menuClickHandler();
          }}
        >
          Report Defect
        </div>
      </div>
    </div>
  );
}

export default Header;
