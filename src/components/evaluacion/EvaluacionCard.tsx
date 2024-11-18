import { EvaluacionDtoType } from "../../lib/api/evaluacion/evaluacion.types";
import { Link } from "react-router-dom";
import { Edit, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "../global/Modal";

type Props = {
  evaluacion: EvaluacionDtoType;
  deleteHandler: () => void;
  isDeleting?:boolean
};

const EvaluacionCard = ({ evaluacion, deleteHandler, isDeleting }: Props) => {

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDeleteHandler = () => {
    setDeleteModal(true);
  }

  const onSubmitHandler = () => {
    deleteHandler();
    setDeleteModal(false);
  }

  return (
    <>
      {
        deleteModal && <Modal 
          title="Eliminar"
          type="danger"
          isLoading={isDeleting}
          body="¿Desea eliminar la Evaluacion?"
          cancelText="Cancelar"
          submitText="Eliminar"
          onClose={() => setDeleteModal(false)}
          onSubmit={onSubmitHandler}
        />
      }

      <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="m-0">{evaluacion.descripcion}</h3>
          <div className="d-flex align-items-center gap-2">
            <Link
              title="Evaluar"
              target="_blank"
              to={`/evaluacion/${evaluacion.id}/update`}
              className="btn btn-success"
            >
              <Edit />
            </Link>
            <Link
              title="Ver Evaluacion"
              target="_blank"
              to={`/evaluacion/${evaluacion.id}`}
              className="btn btn-primary"
            >
              <ExternalLink />
            </Link>
            <button
              onClick={onClickDeleteHandler}
              title="Eliminar Evaluacion"
              type="button"
              className="btn btn-danger"
            >
              <Trash2 />
            </button>
          </div>
        </div>
        <hr ></hr>
        <div className="d-flex justify-content-between align-items-center">
          <span
            className={
              "badge" +
              (evaluacion.pendiente ? " text-bg-warning" : " text-bg-success")
            }
          >
            {evaluacion.pendiente ? "Pendiente" : "Realizada"}
          </span>
          <p className="text-xs text-secondary m-0 text-end">
            Agendada para: {new Date(evaluacion.fecha).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default EvaluacionCard;
