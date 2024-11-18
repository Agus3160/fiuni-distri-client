import { useForm } from "react-hook-form";
import {
  evaluacionDetalleDtoSchema,
  EvaluacionDetalleDtoType,
} from "../../lib/api/evaluacion-detalle/evaluacion-detalle.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateEvalucacionDetalleById } from "../../lib/api/evaluacion/evaluacion.service";

type Props = {
  initialValues?: EvaluacionDetalleDtoType;
};

const EditEvaluacionDetalleForm = ({ initialValues }: Props) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EvaluacionDetalleDtoType>({
    defaultValues: initialValues,
    resolver: zodResolver(evaluacionDetalleDtoSchema),
  });

  const onSubmit = async (data: EvaluacionDetalleDtoType) => {
    const { data: res, message, success } = await updateEvalucacionDetalleById(
      initialValues!.id,
      data,
      session!.accessToken
    )
    if (res && success) {
      toast.success(message);
      navigate("/evaluacion-detalle");
    } else toast.error(message);
  };

  return (
    <form
      className="d-flex flex-column gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="d-flex flex-column gap-1">
        <label htmlFor="criterio">Criterio:</label>
        <input
          {...register("criterio")}
          type="text"
          id="criterio"
          autoComplete="off"
          placeholder="Escriba el nombre del criterio"
          className={`form-control ${errors.criterio ? "is-invalid" : ""}`}
        />
        {errors.criterio && (
          <div className="invalid-feedback">{errors.criterio.message}</div>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <label htmlFor="rol">Puntaje:</label>
        <input
          {...register("puntaje")}
          type="number"
          id="puntaje"
          min={0}
          max={100}
          autoComplete="off"
          placeholder="Escriba el puntaje"
          className={`form-control ${errors.puntaje ? "is-invalid" : ""}`}
        />
        {errors.puntaje && (
          <div className="invalid-feedback">{errors.puntaje.message}</div>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <label htmlFor="comentarios">Descripcion:</label>
        <input
          {...register("comentarios")}
          type="text"
          id="comentarios"
          autoComplete="off"
          placeholder="Escriba los comentarios"
          className={`form-control ${errors.comentarios ? "is-invalid" : ""}`}
        />
        {errors.comentarios && (
          <div className="invalid-feedback">{errors.comentarios.message}</div>
        )}
      </div>

      <div className="mt-3 d-flex flex-column align-items-center gap-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn w-100 btn-primary"
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default EditEvaluacionDetalleForm;
