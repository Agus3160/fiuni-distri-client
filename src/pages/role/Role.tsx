import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RoleDto, RoleFilter } from "../../lib/api/rol/rol.types";
import { getRoles } from "../../lib/api/rol/rol.service";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import CommonsFilterBar from "../../components/global/CommonsFilterBar";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import RoleCard from "../../components/role/RoleCard";

export default function Role() {
  const { isAuth } = useAuth();

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [role, setRole] = useState<RoleDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const session = isAuth();

  useEffect(() => {
    const getRoleByIDEffect = async () => {
      const obj: RoleFilter = mapUrlSearchParamsToObject(params);
      const { data, message, success } = await getRoles(
        session!.accessToken,
        obj
      );
      if (!success || !data) {
        alert(message);
      } else {
        setRole(data.content);
        setIsLoading(false);
      }
    };
    getRoleByIDEffect();
  }, [session, navigate]);

  if (isLoading) return <Loading />;

  if (!role) return <div>Role not found</div>;

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <CommonsFilterBar />
        {
          role.length === 0
            ? "No roles found"
            : role.map((role) => <RoleCard key={role.id} role={role} />)
        }
      </div>
    </div>
  );
}
