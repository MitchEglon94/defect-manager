import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefectModal from "./DefectModal";

function UserCompletedDefects() {
  const [activateModal, setActivateModal] = useState(false);
  const [modalDefectId, setModalDefectId] = useState(null);
  const [relevantUserDefects, setRelevantUserDefects] = useState([]);
  const user = useSelector((store) => store.user.user);
  const completedDefects = useSelector(
    (store) => store.defects.completedDefects
  );
  console.log(completedDefects);

  useEffect(() => {
    setRelevantUserDefects(
      completedDefects.filter((defect) => defect.assignedTo._id === user.userId)
    );
  }, [completedDefects]);

  const modalHandler = (defectInfo) => {
    setActivateModal(!activateModal);
    if (defectInfo) {
      setModalDefectId(defectInfo.defectId);
    }
  };
  return (
    <div className="defect-container">
      <h2>My Completed Defects</h2>
      <ul className="defect-list">
        {relevantUserDefects.map((defect) => (
          <li key={defect.defectId} className="defect-card">
            <div>
              <h3>{defect.title}</h3>
              <p>Reported by: {defect.registeredBy}</p>
              <p>{defect.location}</p>
              <p>{defect.description}</p>
              <p>{`Date completed: ${new Date(
                defect.dateCompleted
              ).toLocaleDateString()}`}</p>
              <button onClick={() => modalHandler(defect)}>More info</button>
              {activateModal && modalDefectId === defect.defectId && (
                <DefectModal d={defect} fn={modalHandler} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCompletedDefects;
