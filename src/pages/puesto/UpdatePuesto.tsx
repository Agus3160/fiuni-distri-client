import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PuestoForm } from "../../components/forms/PuestoForm";
import { useEffect, useState } from "react";
import { PuestoDto } from "../../lib/api/puesto/puesto.types";
import { getPuestoById } from "../../lib/api/puesto/puesto.service";
import Loading from "../Loading";
import { useAuth } from "../../context/auth/useContext";

const UpdatePuesto = () => {

    const { id } = useParams<{ id: string }>();
    const { isAuth } = useAuth();

    const session = isAuth();
    const [loading, setLoading] = useState(true);
    const [puesto, setpuesto] = useState<PuestoDto | null>(null);


    const getPuestoByIDEffect = async () => {
        const { data, message, success } = await getPuestoById(
          Number(id),
          session!.accessToken
        );
        if (!success || !data) {
          alert(message);
        } else {
          setpuesto(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPuestoByIDEffect();
      }, [id]);
    
    if (loading) return <Loading />;
    if (!puesto)
        return (
          <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
            <p className="text-danger">Error al cargar el puesto</p>
          </div>
        );

    return (
            <div className="w-100 pt-5 h-full bg-dark">
              <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
                <div className="d-flex gap-2 align-items-center">
                  <Link to={"/puestos"}>
                    <ChevronLeft />
                  </Link>
                  <h2 className="m-0">Actualizar puesto</h2>
                </div>
                <div
                  className="p-4 rounded mx-auto"
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  <PuestoForm initialValues={puesto} />
                </div>
              </div>
            </div>
    );
};

export default UpdatePuesto;