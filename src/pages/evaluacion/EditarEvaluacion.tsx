import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import EditEvaluacionForm from "../../components/forms/EditEvaluacionForm";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { EvaluacionDtoType } from "../../lib/api/evaluacion/evaluacion.types";
import { EvaluacionDetalleDtoType } from "../../lib/api/evaluacion-detalle/evaluacion-detalle.types";
import {
  getEvaluacionById,
  getEvaluacionDetallesByEvaluacionId,
} from "../../lib/api/evaluacion/evaluacion.service";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import { getEmpleadoById } from "../../lib/api/empleado/empleado.service";

const EditarEvaluacion = () => {
  const { id } = useParams<{ id: string }>();
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [empleado, setEmpleado] = useState<EmpleadoDto>();
  const [evaluacion, setEvaluacion] = useState<EvaluacionDtoType>();
  const [detalles, setDetalles] = useState<EvaluacionDetalleDtoType[]>([]);

  if (!id || Number.isNaN(Number(id)))
    return <div className="text-danger">Id no valido</div>;

  const parsedId = Number(id);

  useEffect(() => {
    const getData = async () => {
      const { data: evaluacion, success: evaluacionSuccess } =
        await getEvaluacionById(parsedId, session!.accessToken);
      const { data: empleado, success: empleadoSuccess } =
        await getEmpleadoById(evaluacion!.empleado_id, session!.accessToken);
      const { data, success } = await getEvaluacionDetallesByEvaluacionId(
        parsedId,
        session!.accessToken
      );
      if (
        !evaluacionSuccess ||
        !evaluacion ||
        !success ||
        !data ||
        !empleado ||
        !empleadoSuccess
      ) {
        toast.error("Error al obtener los datos de la evaluacion");
      } else {
        setEvaluacion(evaluacion);
        setEmpleado(empleado);
        setDetalles(data.content);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) return <Loading />;

  if (!detalles || !evaluacion || !empleado)
    return (
      <div className="py-5 text-center text-danger">Error al obtener datos</div>
    );

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/evaluacion"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Editar Evaluacion Detalle</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <EditEvaluacionForm
            empleado={empleado}
            evaluacionId={parsedId}
            initialValues={{
              ...evaluacion,
              detalles: detalles,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditarEvaluacion;
