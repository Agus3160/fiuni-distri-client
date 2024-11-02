import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "../../lib/definitions";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: ReactNode;
};

const ToastProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ToastContainer {...toastConfig} />
    </>
  );
};

export default ToastProvider;