import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RoleDto, RoleFilter } from "../../lib/api/rol/rol.types";
import { getRoles } from "../../lib/api/rol/rol.service";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import CommonsFilterBar from "../../components/global/CommonsFilterBar";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import RoleCard from "../../components/role/RoleCard";
import Pagination from "../../components/global/Pagination";
import { PaginationResponse } from "../../lib/definitions";
import BasicSearchBar from "../../components/global/BasicSearchBar";
import { PlusCircle } from "lucide-react";

export default function Role() {
  const { isAuth } = useAuth();

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [paginationRole, setPaginationRole] =
    useState<PaginationResponse<RoleDto> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const session = isAuth();

  useEffect(() => {
    const getRoleByIDEffect = async () => {
      const roleFilterObj: RoleFilter = mapUrlSearchParamsToObject(params);
      const { data, message, success } = await getRoles(
        session!.accessToken,
        roleFilterObj
      );
      if (!success || !data) {
        alert(message);
      } else {
        setPaginationRole(data);
        setIsLoading(false);
      }
    };
    getRoleByIDEffect();
  }, [session, navigate]);

  if (isLoading) return <Loading />;

  if (!paginationRole)
    return <div className="text-danger">Error obteniendo roles</div>;

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Roles</h2>
          <Link
            to="/role/create"
            className="d-flex gap-2 align-items-center flex-row btn btn-primary"
          >
            <p className="m-0">Crear</p>
            <PlusCircle size={20} className="text-white" />
          </Link>
        </div>
        <BasicSearchBar
          paramKey="rol"
          placeholder="Buscar por nombre de rol..."
        />
        <CommonsFilterBar />
        {paginationRole.page.totalElements === 0
          ? "Ningun rol fue encontrado"
          : paginationRole.content.map((role) => (
              <RoleCard
                setPaginationRole={setPaginationRole}
                paginationRole={paginationRole}
                key={role.id}
                role={role}
              />
            ))}
      </div>
      <div className="mt-4">
        <Pagination page={paginationRole.page} />
      </div>
    </div>
  );
}
