import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import RoleForm from "../../components/forms/RoleForm";
import { useEffect, useState } from "react";
import { RoleDto } from "../../lib/api/rol/rol.types";
import { getRolById } from "../../lib/api/rol/rol.service";
import Loading from "../Loading";
import { useAuth } from "../../context/auth/useContext";

const UpdateRole = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuth } = useAuth();

  const session = isAuth();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<RoleDto | null>(null);

  const getRoleByIDEffect = async () => {
    const { data, message, success } = await getRolById(
      Number(id),
      session!.accessToken
    );
    if (!success || !data) {
      alert(message);
    } else {
      setRole(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRoleByIDEffect();
  }, [id]);

  if (loading) return <Loading />;
  if (!role)
    return (
      <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
        <p className="text-danger">Error al cargar el rol</p>
      </div>
    );

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/role"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Create Role</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <RoleForm initialValues={role} />
        </div>
      </div>
    </div>
  );
};

export default UpdateRole;
