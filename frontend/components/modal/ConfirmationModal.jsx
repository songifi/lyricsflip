import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to quit the game?</h2>
        <button onClick={onConfirm}>Quit</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;