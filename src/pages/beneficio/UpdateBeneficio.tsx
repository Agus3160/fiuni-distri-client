// UpdateBeneficio.tsx
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BeneficioForm from "../../components/forms/BeneficioForm";
import { useEffect, useState } from "react";
import { BeneficioDto } from "../../lib/api/beneficio/beneficio.types";
import { getBeneficioById } from "../../lib/api/beneficio/beneficio.service";
import Loading from "../Loading";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";

const UpdateBeneficio = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuth } = useAuth();

  const session = isAuth();
  const [loading, setLoading] = useState(true);
  const [beneficio, setBeneficio] = useState<BeneficioDto | null>(null);

  const fetchBeneficioById = async () => {
    const { data, message, success } = await getBeneficioById(
      Number(id),
      session!.accessToken
    );
    if (!success || !data) {
      toast.error(message);
    } else {
      setBeneficio(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBeneficioById();
  }, [id]);

  if (loading) return <Loading />;
  if (!beneficio)
    return (
      <div className="w-100 d-flex justify-content-center align-items-center h-full bg-dark">
        <p className="text-danger">Error al cargar el beneficio</p>
      </div>
    );

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center">
        <div className="d-flex gap-2 align-items-center">
          <Link to={"/beneficio"}>
            <ChevronLeft />
          </Link>
          <h2 className="m-0">Actualizar Beneficio</h2>
        </div>
        <div
          className="p-4 rounded mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <BeneficioForm />
        </div>
      </div>
    </div>
  );
};

export default UpdateBeneficio;
