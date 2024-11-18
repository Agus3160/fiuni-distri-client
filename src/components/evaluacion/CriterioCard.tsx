import { EvaluacionDetalleDtoType } from "../../lib/api/evaluacion-detalle/evaluacion-detalle.types";
import { EvaluacionDtoType } from "../../lib/api/evaluacion/evaluacion.types";
import Modal from "../global/Modal";
import { useState } from "react";

type Props = {
  detalle: EvaluacionDetalleDtoType;
  evaluacion: EvaluacionDtoType;
  isDeleting?: boolean;
  handleDelete: () => void;
};

const CriterioCard = ({ detalle, evaluacion, handleDelete, isDeleting }: Props) => {

  const [isDeletingModal, setIsDeletingModal] = useState<boolean>(false);

  const handleSubmitModal = () => {
    handleDelete();
    setIsDeletingModal(false);
  }

  return (
    <>
      {isDeletingModal && (
        <Modal
          title="Eliminar criterio"
          body="¿Deseas eliminar este criterio?"
          cancelText="Cancelar"
          submitText="Eliminar criterio"
          onSubmit={handleSubmitModal}
          onClose={() => setIsDeletingModal(false)}
          isLoading={isDeleting}
          type="danger"
        />
      )}
      <div className="d-flex  justify-content-between align-items-center gap-2 p-4 rounded shadow bg-light-subtle">
        <h5 className="m-0">
          {detalle.criterio} {!evaluacion.pendiente && `(${detalle.puntaje})`}
        </h5>
      </div>
    </>
  );
};

export default CriterioCard;
