import { Edit, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import Modal from "../global/Modal";
import { useState } from "react";

type Props = {
  empleado: EmpleadoDto;
  isDeleting?: boolean;
  handleDelete: (id: number) => void;
};

const EmpleadoCard = ({ empleado, handleDelete, isDeleting }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleSubmitModal = () => {
    handleDelete(empleado.id);
    setShowModal(false);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <Modal
          type="danger"
          title="Eliminar Empleado"
          body="¿Deseas eliminar este empleado?"
          cancelText="Cancelar"
          submitText="Eliminar"
          isLoading={isDeleting}
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
        />
      )}
      <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="m-0">{empleado.nombre}</h3>
          <div className="d-flex align-items-center gap-2">
            <Link
              title="Ver Empleado"
              target="_blank"
              to={`/empleado/${empleado.id}`}
              className="btn btn-success"
            >
              <ExternalLink />
            </Link>
            <Link
              title="Editar Empleado"
              to={`/empleado/update/${empleado.id}`}
              className="btn btn-primary"
            >
              <Edit />
            </Link>
            <button
              onClick={handleShowModal}
              title="Eliminar Empleado"
              type="button"
              className="btn btn-danger"
            >
              <Trash2 />
            </button>
          </div>
        </div>
        <hr className="h-1"></hr>
        <p className="text-xs text-secondary text-end">
          Created at: {new Date(empleado.createdAt).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default EmpleadoCard;
