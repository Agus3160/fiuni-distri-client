import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import EmpleadoCard from "./EmpleadoCard";
import { deleteEmpleadoById } from "../../lib/api/empleado/empleado.service";
import { useAuth } from "../../context/auth/useContext";

type Props = {
  empladoList: EmpleadoDto[];
  setEmpleados: (data: EmpleadoDto[]) => void;
};

const EmpleadoList = ({ empladoList, setEmpleados }: Props) => {

  const {session} = useAuth();

  if (empladoList.length === 0) return <p>No se han encontrado Empleados</p>;

  const deleteHandler = (id:number) => {
    return async () => {
      await deleteEmpleadoById(id, session!.accessToken);
      setEmpleados(empladoList.filter((empl) => empl.id !== id));
    }
  }

  return (
    <>
      {empladoList.map((empl) => (
        <EmpleadoCard
          key={empl.id}
          empleado={empl}
          handleDelete={deleteHandler(empl.id)}
        />
      ))}
    </>
  );

};

export default EmpleadoList;
