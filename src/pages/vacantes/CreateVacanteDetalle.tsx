import { ChevronLeft, Link } from "lucide-react";
import VacanteDetalleForm from "../../components/forms/VacanteDetalleForm";


const CreateVacanteDetalle = () => {
    return (
        <div className="w-100 pt-5 h-full bg-dark">
            <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
                <div className="d-flex gap-2 align-items-center">
                    <Link to={"/vacantes"}>
                        <ChevronLeft />
                    </Link>
                    <h2 className="m-0">Crear Detalle de la vacante</h2>
                </div>
                <div
                    className="p-4 rounded mx-auto"
                    style={{ maxWidth: "400px", width: "100%" }}
                >
                {<VacanteDetalleForm />}
                </div>
            </div>
        </div>
    );
};
export default CreateVacanteDetalle