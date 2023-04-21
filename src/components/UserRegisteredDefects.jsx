import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDefects } from "../features/defects/defectSlice";
import DefectModal from "./DefectModal";

function UserRegisteredDefects() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const defectStatus = useSelector((store) => store.defects.status);
  const assignedDefects = useSelector(
    (store) => store.defects.activeDefects
  ).filter((defect) => defect.DepartmentRegisteredBy._id === user.role._id);
  console.log(assignedDefects);
  const [activateModal, setActivateModal] = useState(false);
  const [modalDefectId, setModalDefectId] = useState(null);

  useEffect(() => {
    dispatch(getDefects(user.role._id));
  }, [defectStatus === "rerender"]);

  const modalHandler = (defectInfo) => {
    setActivateModal(!activateModal);
    if (defectInfo) {
      setModalDefectId(defectInfo._id);
    }
  };
  return (
    <div className="defect-container">
      <h2>My defects assigned</h2>
      <ul className="defect-list">
        {assignedDefects.map((defect) => (
          <li key={defect._id} className="defect-card">
            {defect.registeredBy === user.userId && (
              <div>
                <h3>{defect.title}</h3>
                <p>{defect.location}</p>
                <button onClick={() => modalHandler(defect)}>More info</button>
                {activateModal && modalDefectId === defect._id && (
                  <DefectModal d={defect} fn={modalHandler} />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRegisteredDefects;
