import { Edit, Trash2 } from "lucide-react";
import { RoleDto } from "../../lib/api/rol/rol.types";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../global/Modal";

type Props = {
  role: RoleDto;
  handleDelete: () => void;
}

const RoleCard = ({ role, handleDelete }: Props) => {

  const [deletingModal, setDeletingModal] = useState(false);
  const onDeleteHanlder = () => {
    handleDelete();
    setDeletingModal(false);
  }

  return (
    <>
      {deletingModal && (
        <Modal
          type="danger"
          title="Eliminar rol"
          cancelText="Cancelar"
          submitText="Eliminar"
          body="¿Está seguro de eliminar el rol?"
          onClose={() => setDeletingModal(false)}
          onSubmit={onDeleteHanlder}
        />
      )}

      <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="m-0">{role.rol}</h3>
          <div className="d-flex align-items-center gap-2">
            <Link
              title="Editar rol"
              to={`/role/update/${role.id}`}
              className="btn btn-primary"
            >
              <Edit />
            </Link>
            <button
              onClick={() => setDeletingModal(true)}
              title="Eliminar rol"
              type="button"
              className="btn btn-danger"
            >
              <Trash2 />
            </button>
          </div>
        </div>
        <hr className="h-1"></hr>
        <p className="text-xs text-secondary text-end">
          Created at: {new Date(role.createdAt).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default RoleCard;
