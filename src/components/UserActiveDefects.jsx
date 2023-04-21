import React from "react";
import { useSelector } from "react-redux";
import DefectBlock from "./DefectBlock";

function UserActiveDefects() {
  const user = useSelector((store) => store.user.user);
  const activeDefects = useSelector(
    (store) => store.defects.activeDefects
  ).filter((defect) => defect.DepartmentAssignedTo._id === user.role._id);
  console.log(activeDefects);
  return (
    <div className="defect-container">
      <h2>My defects to do</h2>
      <ul className="defect-list">
        {activeDefects.map((defect) => (
          <li key={defect._id} className="defect-card">
            <DefectBlock defect={defect} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserActiveDefects;
