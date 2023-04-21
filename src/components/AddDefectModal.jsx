import React from "react";
import AddDefectForm from "./AddDefectForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function AddDefectModal(props) {
  const closeModal = props.fn;
  return (
    <div className="modal-window">
      <div className="modal-content">
        <div className="modal-header">
          <FontAwesomeIcon
            className="modal-close-btn"
            icon={faX}
            onClick={() => closeModal()}
          />
        </div>

        <h2>Add Defect</h2>
        <AddDefectForm />
      </div>
    </div>
  );
}

export default AddDefectModal;
