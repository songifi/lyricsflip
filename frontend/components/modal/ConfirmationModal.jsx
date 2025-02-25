import PropTypes from "prop-types";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  className = "",
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${className}`} {...props}>
      <div className="modal-content">
        <h2>Are you sure you want to quit the game?</h2>
        <button onClick={onConfirm}>Quit</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ConfirmationModal;
