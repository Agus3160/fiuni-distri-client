import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import BasicSearchBar from "../../components/global/BasicSearchBar";
import Pagination from "../../components/global/Pagination";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import { PageProps } from "../../lib/definitions";
import {
  EvaluacionDtoType,
  EvaluacionFilter,
} from "../../lib/api/evaluacion/evaluacion.types";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import {
  deleteEvaluacionById,
  getAllEvaluaciones,
} from "../../lib/api/evaluacion/evaluacion.service";
import EvaluacionCard from "../../components/evaluacion/EvaluacionCard";
import { toast } from "react-toastify";

const Evaluaciones = () => {
  const { isAuth } = useAuth();

  const [params] = useSearchParams();
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionDtoType[] | null>(
    null
  );
  const [pagination, setPagination] = useState<PageProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const session = isAuth();

  const deleteEvaluacionHandler = (id: number) => {
    return async () => {
      setIsDeleting(true);
      const { success, message: deleteMessage } = await deleteEvaluacionById(
        id,
        session!.accessToken
      );
      if (success) {
        toast.success(deleteMessage);
        setEvaluaciones((prev) => prev && prev.filter((u) => u.id !== id));
      } else toast.error(deleteMessage);
      setIsDeleting(false);
    };
  };

  useEffect(() => {
    const getRoleByIDEffect = async () => {
      const filter: EvaluacionFilter = mapUrlSearchParamsToObject(params);
      const { data, message, success } = await getAllEvaluaciones(
        filter,
        session!.accessToken
      );
      if (!success || !data) {
        alert(message);
      } else {
        setEvaluaciones(data.content);
        setPagination(data.page);
        setIsLoading(false);
      }
    };
    getRoleByIDEffect();
  }, [session]);

  if (isLoading) return <Loading />;

  if (!evaluaciones || !pagination)
    return <div className="text-danger">Error obteniendo Evaluaciones</div>;

  return (
    <div className="w-100 py-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Evaluacion</h2>
          <Link
            to="/evaluacion/create"
            className="d-flex gap-2 align-items-center flex-row btn btn-primary"
          >
            <p className="m-0">Crear</p>
            <PlusCircle size={20} className="text-white" />
          </Link>
        </div>
        <BasicSearchBar
          paramKey="descripcion"
          placeholder="Buscar por descripcion..."
        />
        {evaluaciones.length > 0 ? (
          evaluaciones.map((evaluacion) => (
            <EvaluacionCard
              deleteHandler={deleteEvaluacionHandler(evaluacion.id)}
              isDeleting={isDeleting}
              key={evaluacion.id}
              evaluacion={evaluacion}
            />
          ))
        ) : (
          <div className="text-muted">No se encontraron Evaluaciones</div>
        )}
      </div>
      <Pagination page={pagination} />
    </div>
  );
};

export default Evaluaciones;
