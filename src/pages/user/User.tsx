import CommonsFilterBar from "../../components/global/CommonsFilterBar";
import CrearBtn from "../../components/global/CrearBtn";
import BasicSearchBar from "../../components/global/BasicSearchBar";
import Pagination from "../../components/global/Pagination";
import UserList from "../../components/user/UserList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { PaginationResponse } from "../../lib/definitions";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import Loading from "../Loading";
import { UserDto, UserFilter } from "../../lib/api/user/user.types";
import { getAllUsers } from "../../lib/api/user/user.service";

const User = () => {

  const { session } = useAuth();

  const [params] = useSearchParams();
  const [paginationUsers, setPaginationUsers] = useState<PaginationResponse<UserDto> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoleByIDEffect = async () => {
      const roleFilterObj: UserFilter = mapUrlSearchParamsToObject(params);
      const { data, message, success } = await getAllUsers(
        session!.accessToken,
        roleFilterObj
      );
      if (!success || !data) {
        alert(message);
      } else {
        setPaginationUsers(data);
        setIsLoading(false);
      }
    };
    getRoleByIDEffect();
  }, [session]);

  if (isLoading) return <Loading />;

  if (!paginationUsers)
    return <div className="text-danger">Error obteniendo usuarios</div>;

  return (
    <div className="w-100 py-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Usuarios</h2>
          <CrearBtn entity="user" />
        </div>
        <BasicSearchBar
          paramKey="username"
          placeholder="Buscar por username..."
        />
        <CommonsFilterBar />
        <UserList users={paginationUsers} setUsers={setPaginationUsers} />
      </div>
      <Pagination page={paginationUsers.page} />
    </div>
  );
};

export default User;
