import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";
import { EvaluacionDetalleDtoType } from "../../lib/api/evaluacion-detalle/evaluacion-detalle.types";
import { getEvaluacionDetalleById } from "../../lib/api/evaluacion/evaluacion.service";
import { useAuth } from "../../context/auth/useContext";
import { ChevronLeft } from "lucide-react";
import EditEvaluacionDetalleForm from "../../components/forms/EditEvaluacionDetalleForm";
import { toast } from "react-toastify";

const EditarEvaluacionDetalle = () => {
  const { evaluacionId, evaluacionDetalleId } = useParams<{
    evaluacionId: string;
    evaluacionDetalleId: string;
  }>();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [evaluacionDetalle, setEvaluacionDetalle] =
    useState<EvaluacionDetalleDtoType>();

  if (
    !evaluacionId ||
    Number.isNaN(Number(evaluacionId)) ||
    !evaluacionDetalleId ||
    Number.isNaN(Number(evaluacionDetalleId))
  )
    return <div className="text-danger p-5 text-center">Id no valido</div>;

  useEffect(() => {
    const getEvaluacionDetalleEffect = async () => {
      const { data, message, success } = await getEvaluacionDetalleById(
        Number(evaluacionDetalleId),
        session!.accessToken
      );
      if (!success || !data) {
        toast.error(message);
      } else {
        setEvaluacionDetalle(data);
      }
      setIsLoading(false);
    };
    getEvaluacionDetalleEffect();
  }, [evaluacionDetalleId, evaluacionId]);

  if (isLoading) return <Loading />;

  if (!evaluacionDetalle)
    return (
      <div className="text-danger p-5 text-center">
        Detalle de la evaluacion no encontrada
      </div>
    );

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/evaluacion/" + evaluacionId}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Editar Evaluacion Detalle</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <EditEvaluacionDetalleForm initialValues={evaluacionDetalle} />
        </div>
      </div>
    </div>
  );
};

export default EditarEvaluacionDetalle;
