import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  entity:string;
};

const CrearBtn = ({entity}: Props) => {
  return (
    <Link
      to={`/${entity}/create`}
      className="d-flex gap-2 align-items-center flex-row btn btn-primary"
    >
      <p className="m-0">Crear</p>
      <PlusCircle size={20} className="text-white" />
    </Link>
  );
};

export default CrearBtn;
