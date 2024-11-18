import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useContext";
import { deleteUserById } from "../../lib/api/user/user.service";
import { UserDto } from "../../lib/api/user/user.types";
import { PaginationResponse } from "../../lib/definitions";
import UserCard from "./UserCard";
import { useState } from "react";

type Props = {
  users: PaginationResponse<UserDto>;
  setUsers: React.Dispatch<
    React.SetStateAction<PaginationResponse<UserDto> | null>
  >;
};

const UserList = ({ users, setUsers }: Props) => {
  const { session } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = async (id: number) => {
    setIsDeleting(true);
    const { success } = await deleteUserById(id, session!.accessToken);
    if (!success) toast.error("Error al eliminar el usuario");
    else {
      setUsers(
        (prevUsers) =>
          prevUsers && {
            ...prevUsers,
            content: prevUsers.content.filter((user) => user.id !== id),
          }
      );
      toast.success("Usuario Eliminado");
    }
    setIsDeleting(false);
  };

  if (users.content.length === 0) return <p>No se han encontrado Usuarios</p>;
  return (
    <>
      {users.content.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isDeleting={isDeleting}
          deleteHandler={deleteHandler}
        />
      ))}
    </>
  );
};

export default UserList;
