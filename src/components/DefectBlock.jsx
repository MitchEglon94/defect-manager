import React, { useState } from "react";
import DefectModal from "./DefectModal";

function DefectBlock({ defect }) {
  const [activateModal, setActivateModal] = useState(false);
  const [modalDefectId, setModalDefectId] = useState(null);

  const modalHandler = (defectInfo) => {
    setActivateModal(!activateModal);
    if (defectInfo) {
      setModalDefectId(defectInfo.defectId);
    }
  };
  return (
    <div>
      <h3>{defect.title}</h3>
      <p>{defect.location}</p>
      <p>{defect.description}</p>
      <p>{new Date(defect.createdAt).toLocaleDateString()}</p>
      <button onClick={() => modalHandler(defect)}>More info</button>
      {activateModal && modalDefectId === defect.defectId && (
        <DefectModal d={defect} fn={modalHandler} />
      )}
    </div>
  );
}

export default DefectBlock;
