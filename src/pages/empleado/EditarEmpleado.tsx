import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import { getEmpleadoById } from "../../lib/api/empleado/empleado.service";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import EmpleadoForm from "../../components/forms/EmpleadoForm";

const EditarEmpleado = () => {

  const { id } = useParams<{ id: string }>();
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [empleado, setEmpleado] = useState<EmpleadoDto | null>(null);

  const getRoleByIDEffect = async () => {
    const { data, message, success } = await getEmpleadoById(
      Number(id),
      session!.accessToken
    );
    if (!success || !data) {
      toast.error(message);
    } else {
      setEmpleado(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRoleByIDEffect();
  }, [id]);

  if (loading) return <Loading />;
  if (!empleado)
    return (
      <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
        <p className="text-danger">Error al cargar el empleado</p>
      </div>
    );

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/empleado"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Actualizar Empleado</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <EmpleadoForm initialValues={empleado} />
        </div>
      </div>
    </div>
  );
};

export default EditarEmpleado;
