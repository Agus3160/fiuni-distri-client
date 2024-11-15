import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { VacanteDetalleDto } from "../../lib/api/Vacante/vacanteDetalle.types";
import { ChevronLeft } from "lucide-react";
import VacanteDetalleForm from "../../components/forms/VacanteDetalleForm";
import { getVacanteDetalleById } from "../../lib/api/Vacante/VacanteDetalle.service";




const UpdateVacanteDetalle = () => {
    const { id, id_detalle } = useParams<{id: string, id_detalle: string}>();
    const { isAuth } = useAuth();

    const session = isAuth();
    const [loading, setLoading] = useState(true);


    const [vacanteDetalle, setVacanteDetalle] = useState<VacanteDetalleDto | null>(null);


    const getVacanteDetalleByIDEffect = async () => {
        const { data, message, success } = await getVacanteDetalleById(
          Number(id),
          Number(id_detalle),
          session!.accessToken
        );
        if (!success || !data) {
          toast.error(message);
        } else {
          setVacanteDetalle(data);
        }
        setLoading(false);
    };
    useEffect(() => {
        getVacanteDetalleByIDEffect();
      }, [id]);

      if (loading) return <Loading />;
      if (!vacanteDetalle)
          return (
            <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
              <p className="text-danger">Error al cargar el detalle de la vacante</p>
            </div>
          );

          return (
            <div className="w-100 pt-5 h-full bg-dark">
                <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
                    <div className="d-flex gap-2 align-items-center">
                        <Link to={"/vacantes"}>
                            <ChevronLeft />
                        </Link>
                    <h2 className="m-0">Actualizar Detalle de la Vacante</h2>
            </div>
            <div
              className="p-4 rounded mx-auto"
              style={{ maxWidth: "400px", width: "100%" }}
            >
              <VacanteDetalleForm initialValues={vacanteDetalle}/>
            </div>
          </div>
        </div>
        );

};

export default UpdateVacanteDetalle