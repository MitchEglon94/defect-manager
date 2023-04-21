import React, { useState, useEffect } from "react";
import UserActiveDefects from "../components/UserActiveDefects";
import UserRegisteredDefects from "../components/UserRegisteredDefects";
import UserCompletedDefects from "../components/UserCompletedDefects";
import { useSelector } from "react-redux";

function Homepage() {
  const user = useSelector((store) => store.user.user);
  const defects = useSelector((store) => store.defects.activeDefects);
  const [listSelection, setListSelection] = useState("active");
  console.log(user);
  useEffect(() => {}, [defects]);
  return (
    <div className="homepage-container">
      <div>
        <h1>{`${user.name}'s Dashboard`}</h1>
        <p>{`Rank: ${user.role.name}`}</p>
      </div>
      <select
        onChange={(e) => {
          setListSelection(e.target.value);
        }}
        name="defect-list-selector"
        id="defect-list-selector"
        className="defect-list-selector"
      >
        <option value={null}>Choose your list...</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="assigned">Assigned</option>
      </select>
      {listSelection === "active" && <UserActiveDefects />}
      {listSelection === "completed" && <UserCompletedDefects />}
      {listSelection === "assigned" && <UserRegisteredDefects />}
    </div>
  );
}

export default Homepage;
