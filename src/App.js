import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { findRoles } from "../src/features/roles/rolesSlice";

import "./App.css";
import { getDefects } from "./features/defects/defectSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    dispatch(findRoles());
  }, []);

  useEffect(() => {
    console.log("FIRED!!");
    if (user) {
      dispatch(getDefects(user.role._id));
    }
  }, [user]);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
