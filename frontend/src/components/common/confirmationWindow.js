import React from "react";
import { Modal, Button } from "react-bootstrap";
import useTranslation from "../../hooks/translation";

const ConfirmationWindow = (props) => {
  const {
    showModal,
    closeModal,
    confirmDelete,
    confirmMessage,
    confirmMessageValue,
  } = props;

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    confirmDelete();
  };

  const handleClose = () => {
    closeModal();
  };

  const translation = useTranslation();

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>{translation.ConfirmDelete}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmMessage} <b>{confirmMessageValue}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleConfirmDelete}>
            {translation.Yes}
          </Button>
          <Button onClick={handleClose}>{translation.No}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationWindow;
