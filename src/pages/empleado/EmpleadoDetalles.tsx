import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { getEmpleadoById } from "../../lib/api/empleado/empleado.service";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { BriefcaseBusiness, ChevronDown, ChevronLeft, Loader2, User } from "lucide-react";
import { PuestoDto } from "../../lib/api/puesto/puesto.types";
import { UserDto } from "../../lib/api/user/user.types";
import { getPuestoById } from "../../lib/api/puesto/puesto.service";
import { getUserById } from "../../lib/api/user/user.service";
import { numberFormatter } from "../../lib/utils";

type Props = {};

const EmpleadoDetalles = ({}: Props) => {
  const { session } = useAuth();
  const { id } = useParams<{ id: string }>();

  // loaders states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPuesto, setIsLoadingPuesto] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // data states
  const [empleado, setEmpleado] = useState<EmpleadoDto | null>(null);
  const [puesto, setPuesto] = useState<PuestoDto | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);

  // effects
  useEffect(() => {
    const getEmpleadoByIDEffect = async () => {
      const { data, message, success } = await getEmpleadoById(
        Number(id),
        session!.accessToken
      );
      if (!success || !data) toast.error(message);
      else {
        setEmpleado(data);
        setIsLoading(false);
      }
    };
    getEmpleadoByIDEffect();
  }, [id]);

  // handlers
  const getPuestoDataHandler = (idPuesto: number) => {
    return async () => {
      setIsLoadingPuesto(true);
      const { data, message, success } = await getPuestoById(
        idPuesto,
        session!.accessToken
      );
      if (!success || !data) toast.error(message);
      else {
        setPuesto(data);
        setIsLoadingPuesto(false);
      }
    };
  };

  const getUserDataHanlder = (idUser: number) => {
    return async () => {
      setIsLoadingUser(true);
      const { data, message, success } = await getUserById(
        idUser,
        session!.accessToken
      );
      if (!success || !data) toast.error(message);
      else {
        setUser(data);
        setIsLoadingUser(false);
      }
    };
  };

  if (isLoading) return <Loading />;

  if (!empleado)
    return (
      <p className="text-danger">
        No se han podido obtener los datos del empleado
      </p>
    );

  return (
    <div className="container py-5">
      <div className="d-flex flex-column gap-4">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/empleado"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Empleado Detalles</h2>
        </div>

        <div className="d-flex p-4 rounded shadow bg-light-subtle align-items-center justify-content-between">
          <h2 className="text-primary">{empleado.nombre}</h2>
          <h4>CI: {empleado.ci}</h4>
        </div>

        <div className="d-flex flex-column gap-2 p-4 rounded shadow bg-light-subtle">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="text-primary">Puesto</h5>
            {isLoadingPuesto ? (
              <Loader2 className="spin-animation" />
            ) : puesto ? (
              <BriefcaseBusiness />
            ) : (
              <ChevronDown onClick={getPuestoDataHandler(empleado.puesto_id)} />
            )}
          </div>
          {puesto && (
            <div className="text-sm">
              <p className="text-secondary-emphasis fw-semibold">
                {puesto.nombre}
              </p>
              <p className="text-secondary-emphasis fw-light">
                Sueldo: {numberFormatter.format(puesto.sueldo)} Gs.
              </p>
              <p className="m-0 text-secondary-emphasis fw-light">
                Creacion: {new Date(puesto.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="d-flex flex-column gap-2 p-4 rounded shadow bg-light-subtle">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="text-primary">Usuario</h5>
            {isLoadingUser ? (
              <Loader2 className="spin-animation" />
            ) : user ? (
              <User />
            ) : (
              <ChevronDown onClick={getUserDataHanlder(empleado.user_id)} />
            )}
          </div>
          {user && (
            <div className="text-sm">
              <p className="text-secondary-emphasis fw-semibold">
                {user.username}
              </p>
              <p className="text-secondary-emphasis fw-light">
                Email: {user.email}
              </p>
              <p className="m-0 text-secondary-emphasis fw-light">
                Creacion: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpleadoDetalles;
