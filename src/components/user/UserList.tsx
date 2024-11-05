import { useAuth } from "../../context/auth/useContext";
import { deleteUserById } from "../../lib/api/user/user.service";
import { UserDto } from "../../lib/api/user/user.types";
import { PaginationResponse } from "../../lib/definitions";
import UserCard from "./UserCard";

type Props = {
  users: PaginationResponse<UserDto>,
  setUsers: (data: PaginationResponse<UserDto>) => void
}

const UserList = ({ users, setUsers }: Props) => {

  const { session } = useAuth();

  const deleteHandler = (id:number) => {
    return async () => {
      await deleteUserById(id, session!.accessToken);
      setUsers({
        ...users,
        content: users.content.filter((user) => user.id !== id),
      });
    }
  }

  if (users.content.length === 0) return <p>No se han encontrado Usuarios</p>;
  return (
    <>
      {users.content.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          deleteHandler={deleteHandler(user.id)}
        />
      ))}
    </>
  );
}

export default UserList