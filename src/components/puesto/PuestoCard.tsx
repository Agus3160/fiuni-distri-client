import { PuestoDto } from "../../lib/api/puesto/puesto.types";

type Props = {
    puesto: PuestoDto;
}

const PuestoCard = ({ puesto }: Props) => {
    return (
        <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
          <h3 className="m-0">{puesto.nombre}</h3>
          <hr className="h-1"></hr>
          <p className="text-xs text-secondary text-end">
            Created at: {new Date(puesto.createdAt).toLocaleString()}
          </p>
        </div>
      );
};

export default PuestoCard;