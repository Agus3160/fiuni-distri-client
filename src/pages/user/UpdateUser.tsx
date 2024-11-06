import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import UserForm from "../../components/forms/UserForm";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import { UserDto } from "../../lib/api/user/user.types";
import { getUserById } from "../../lib/api/user/user.service";

const UpdateUser = () => {

  const { id } = useParams<{ id: string }>();
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDto | null>(null);

  const getRoleByIDEffect = async () => {
    const { data, message, success } = await getUserById(
      Number(id),
      session!.accessToken
    );
    if (!success || !data) {
      toast.error(message);
    } else {
      setUser(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRoleByIDEffect();
  }, [id]);

  if (loading) return <Loading />;
  if (!user)
    return (
      <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
        <p className="text-danger">Error al cargar el rol</p>
      </div>
    );

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/user"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Actualizar Usuario</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <UserForm initialValues={user} />
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
