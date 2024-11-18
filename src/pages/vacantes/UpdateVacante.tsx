import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { useEffect, useState } from "react";
import { VacanteDto } from "../../lib/api/Vacante/vacante.types";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { ChevronLeft } from "lucide-react";
import VacanteForm from "../../components/forms/VacanteForm";
import { getVacanteById } from "../../lib/api/Vacante/Vacante.service";



const UpdateVacante = () => {

    const { id } = useParams<{ id: string }>();
    const { isAuth } = useAuth();

    const session = isAuth();
    const [loading, setLoading] = useState(true);

    const [vacante, setVacante] = useState<VacanteDto | null>(null);

    const getVacanteByIDEffect = async () => {
        const { data, message, success } = await getVacanteById(
          Number(id),
          session!.accessToken
        );
        if (!success || !data) {
          toast.error(message);
        } else {
          setVacante(data);
        }
        setLoading(false);
    };
  
    useEffect(() => {
        getVacanteByIDEffect();
      }, [id]);

      if (loading) return <Loading />;
      if (!vacante)
          return (
            <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
              <p className="text-danger">Error al cargar la vacante</p>
            </div>
          );

    return (
        <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/vacantes"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Actualizar Vacante</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <VacanteForm initialValues={vacante}/>
        </div>
      </div>
    </div>
    );


};

export default UpdateVacante;