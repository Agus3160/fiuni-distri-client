import { createContext, ReactNode, useState } from "react";
import { ToastContextType, ToastMessage } from "../../lib/definitions";
import Toast from "../../components/global/Toast";

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const MAX_TOAST = 3;
  const [toastList, setToastList] = useState<ToastMessage[]>([]);

  const toastMessage = (data: ToastMessage) => {
    setToastList((prevList) => {
      const updatedList = [...prevList, data].slice(-MAX_TOAST);
      return updatedList;
    });
    setTimeout(() => {
      setToastList((prevList) => prevList.filter((toast) => toast !== data));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toastMessage }}>
      {children}
      {toastList.length > 0 &&
        toastList.map((toast, index) => (
          <Toast
            key={"id"+index}
            message={toast.message}
            type={toast.type}
          />
        ))}
    </ToastContext.Provider>
  );
};
