import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { PageProps } from "../../lib/definitions";
import { EmpleadoDto, EmpleadoFilter } from "../../lib/api/empleado/empleado.types";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import { getAllEmpleados } from "../../lib/api/empleado/empleado.service";
import CrearBtn from "../../components/global/CrearBtn";
import BasicSearchBar from "../../components/global/BasicSearchBar";
import CommonsFilterBar from "../../components/global/CommonsFilterBar";
import EmpleadoList from "../../components/empleado/EmpleadoList";
import Pagination from "../../components/global/Pagination";


const Empleado = () => {

  const { session } = useAuth();

  const [params] = useSearchParams();
  const [empleados, setEmpleados] = useState<EmpleadoDto[] | null>(null);
  const [page, setPage] = useState<PageProps|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoleByIDEffect = async () => {
      const roleFilterObj: EmpleadoFilter = mapUrlSearchParamsToObject(params);
      const { data, message, success } = await getAllEmpleados(
        session!.accessToken,
        roleFilterObj
      );
      if (!success || !data) {
        alert(message);
      } else {
        setPage(data.page)
        setEmpleados(data.content);
        setIsLoading(false);
      }
    };
    getRoleByIDEffect();
  }, [session]);

  if (isLoading) return <Loading />;

  if (!empleados || !page)
    return <div className="text-danger">Error obteniendo usuarios</div>;

  return (
    <div className="w-100 py-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Empleados</h2>
          <CrearBtn entity="empleado" />
        </div>
        <BasicSearchBar
          paramKey="ci"
          placeholder="Buscar por CI..."
        />
        <CommonsFilterBar />
        <EmpleadoList empladoList={empleados} setEmpleadoList={setEmpleados} />
      </div>
      <Pagination page={page} />
    </div>
  )
}

export default Empleado