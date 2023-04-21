import React from "react";
import CompleteDefectForm from "./CompleteDefectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function DefectModal(props) {
  console.log(props);
  const defect = props.d;
  const closeModal = props.fn;
  return (
    <div className="modal-window">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2>{defect.title}</h2>
            <p>{defect.location}</p>
          </div>
          <FontAwesomeIcon
            className="modal-close-btn"
            icon={faX}
            onClick={() => closeModal()}
          />
        </div>
        <CompleteDefectForm defect={defect} />
      </div>
    </div>
  );
}

export default DefectModal;
