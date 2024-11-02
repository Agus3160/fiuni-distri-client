import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PuestoForm from "../../components/forms/PuestoForm";

const CreatePuesto = () => {
    return (
      <div className="w-100 pt-5 h-full bg-dark">
        <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
          <div className="d-flex gap-2 align-items-center">
            <Link to={"/puestos"}>
              <ChevronLeft />
            </Link>
            <h2 className="m-0">Crear Puesto</h2>
          </div>
          <div
            className="p-4 rounded mx-auto"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <PuestoForm />
          </div>
        </div>
      </div>
    );
  };
  
  export default CreatePuesto;