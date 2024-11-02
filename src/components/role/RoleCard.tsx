import { Trash2 } from "lucide-react";
import { RoleDto } from "../../lib/api/rol/rol.types";
import { useToastContext } from "../../context/toast/useToastContext";
import Toast from "../global/Toast";

type Props = {
  role: RoleDto;
};

const RoleCard = ({ role }: Props) => {

  const {toastMessage} = useToastContext();

  return (
    <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="m-0">{role.rol}</h3>
        <button onClick={()=> toastMessage({message: "Hola", type: "info"})} type="button" className="btn btn-danger">
          <Trash2 />
        </button>
      </div>
      <hr className="h-1"></hr>
      <p className="text-xs text-secondary text-end">
        Created at: {new Date(role.createdAt).toLocaleString()}
      </p>
      <Toast message="hola" type="info" />
    </div>
  );
};

export default RoleCard;
