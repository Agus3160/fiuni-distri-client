type Props = {
  title: string;
  body: string;
  type: "primary" | "danger" | "warning";
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
  onClose: () => void;
  onSubmit: () => void;
};

const Modal = ({
  title,
  body,
  submitText,
  cancelText,
  isLoading,
  type,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <div className=" position-fixed top-0 left-0 right-0 bottom-0" style={{zIndex:20}}>
      <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{body}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                data-bs-dismiss="modal"
              >
                {cancelText ? cancelText : "Close"}
              </button>
              <button
                disabled={isLoading}
                onClick={onSubmit}
                type="button"
                className={`btn btn-${type}`}
              >
                {submitText ? submitText : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
