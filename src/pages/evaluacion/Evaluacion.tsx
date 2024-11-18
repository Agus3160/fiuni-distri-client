import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EvaluacionDtoType } from "../../lib/api/evaluacion/evaluacion.types";
import Loading from "../Loading";
import { useAuth } from "../../context/auth/useContext";
import {
  deleteEvaluacionDetalleById,
  getEvaluacionById,
  getEvaluacionDetallesByEvaluacionId,
} from "../../lib/api/evaluacion/evaluacion.service";
import { toast } from "react-toastify";
import { getEmpleadoById } from "../../lib/api/empleado/empleado.service";
import { Loader2, User, ChevronDown, ChevronLeft } from "lucide-react";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import { EvaluacionDetalleDtoType } from "../../lib/api/evaluacion-detalle/evaluacion-detalle.types";
import CriterioCard from "../../components/evaluacion/CriterioCard";

const Evaluacion = () => {
  // STATES
  const { session } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [evaluacion, setEvaluacion] = useState<EvaluacionDtoType | null>(null);
  const [detalles, setDetalles] = useState<EvaluacionDetalleDtoType[]>([]);
  const [empleado, setEmpleado] = useState<EmpleadoDto | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoadingEmpleado, setIsLoadingEmpleado] = useState<boolean>(false);
  const [isLoadingDetalles, setIsLoadingDetalles] = useState<boolean>(true);
  const [isLoadingEvaluacion, setIsLoadingEvaluacion] = useState<boolean>(true);

  const calcularPromedio = (puntos: number[]) => {
    return puntos.reduce((acc, p) => acc + p, 0) / puntos.length;
  };

  const handleCriterioDelete = (id: number) => {
    return async () => {
      setIsDeleting(true);
      if (!evaluacion || !detalles) return;
      const { success } = await deleteEvaluacionDetalleById(
        id,
        session!.accessToken
      );
      if (success) {
        const nuevosDetalles = detalles.filter((d) => d.id !== id);
        const nuevoPromedio = calcularPromedio(
          nuevosDetalles.map((d) => d.puntaje)
        );
        setEvaluacion({ ...evaluacion, puntaje_general: nuevoPromedio });
        setDetalles(nuevosDetalles);
      } else toast.error("Error al eliminar el criterio");
      setIsDeleting(false);
    };
  };

  useEffect(() => {
    const fetchEvaluacion = async () => {
      const { data, message, success } = await getEvaluacionById(
        Number(id),
        session!.accessToken
      );
      if (!success || !data) {
        toast.error(message);
      } else {
        setEvaluacion(data);
      }
      setIsLoadingEvaluacion(false);
    };
    fetchEvaluacion();
  }, []);

  useEffect(() => {
    if (!evaluacion) return;

    const getDetalles = async () => {
      const { data, message, success } =
        await getEvaluacionDetallesByEvaluacionId(
          evaluacion.id,
          session!.accessToken
        );
      if (!success || !data) {
        toast.error(message);
      } else {
        setDetalles(data.content);
      }
    };
    getDetalles();
    setIsLoadingDetalles(false);
  }, [evaluacion]);

  if (!id || Number.isNaN(Number(id)))
    return <div className="text-danger p-5 text-center">Id no valido</div>;
  if (isLoadingEvaluacion) return <Loading />;

  if (!evaluacion)
    return (
      <div className="text-danger p-5 text-center">
        Evaluacion no encontrada
      </div>
    );

  const handleGetEmpleado = (idEmplado: number) => {
    return async () => {
      setIsLoadingEmpleado(true);
      const { data, message, success } = await getEmpleadoById(
        idEmplado,
        session!.accessToken
      );
      if (!success || !data) {
        toast.error(message);
      } else {
        setEmpleado(data);
      }
      setIsLoadingEmpleado(false);
    };
  };

  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-5">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <Link to={"/evaluacion"}>
                    <ChevronLeft />
                  </Link>

                  <h2 className="text-primary fw-semibold fs-1">
                    {evaluacion.descripcion}
                  </h2>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <h4 className="fw-light m-0">
                  Fecha: {new Date(evaluacion.fecha).toDateString()}
                </h4>
                <span
                  className={
                    "badge m-0" +
                    (evaluacion.pendiente
                      ? " text-bg-warning"
                      : " text-bg-success")
                  }
                >
                  {evaluacion.pendiente ? "Pendiente" : "Realizada"}
                </span>
              </div>

              {!evaluacion.pendiente && (
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="fw-light m-0">Puntaje General:</h4>
                  <h3>{evaluacion.puntaje_general}</h3>
                </div>
              )}

              <div className="d-flex flex-column gap-2 p-4 rounded shadow bg-light-subtle">
                <div className="d-flex align-items-center justify-content-between">
                  <h5 className="text-primary m-0">Empelado</h5>
                  {isLoadingEmpleado ? (
                    <Loader2 className="spin-animation" />
                  ) : empleado ? (
                    <User />
                  ) : (
                    <ChevronDown
                      onClick={handleGetEmpleado(evaluacion.empleado_id)}
                    />
                  )}
                </div>
                {empleado && (
                  <div className="text-sm">
                    <p className="text-secondary-emphasis m-0 fw-semibold">
                      {empleado.nombre}
                    </p>
                    <p className="text-secondary-emphasis m-0  fw-light">
                      CI: {empleado.ci}
                    </p>
                    <p className="m-0 text-secondary-emphasis fw-light">
                      Creacion:{" "}
                      {new Date(empleado.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column gap-4">
              <h2 className=" fw-semibold fs-2">Criterios</h2>
              {isLoadingDetalles ? (
                <Loader2 className="spin-animation" />
              ) : detalles.length === 0 ? (
                <div className="text-muted">
                  Esta evaluacion no contiene criterios
                </div>
              ) : (
                detalles.map((d) => (
                  <CriterioCard
                    key={d.id}
                    isDeleting={isDeleting}
                    handleDelete={handleCriterioDelete(d.id)}
                    detalle={d}
                    evaluacion={evaluacion}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluacion;
