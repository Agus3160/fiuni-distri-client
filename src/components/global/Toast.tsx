import { ToastMessage } from "../../lib/definitions";

type Props = ToastMessage;

const Toast = ({ message, type }: Props) => {
  const classNameType = type === "info" ? "primary" : type;

  return (

    console.log(type),

    <div
      className={
        "toast align-items-center border-0 " + `text-bg-${classNameType}`
      }
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;
