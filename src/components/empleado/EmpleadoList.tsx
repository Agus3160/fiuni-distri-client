import { useState } from "react";
import { useAuth } from "../../context/auth/useContext";
import { deleteEmpleadoById } from "../../lib/api/empleado/empleado.service";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import EmpleadoCard from "./EmpleadoCard";
import { toast } from "react-toastify";

type Props = {
  empladoList: EmpleadoDto[];
  setEmpleadoList: React.Dispatch<React.SetStateAction<EmpleadoDto[] | null>>;
};

const EmpleadoList = ({ empladoList, setEmpleadoList }: Props) => {
  const { session } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  if (empladoList.length === 0) return <p>No se han encontrado Empleados</p>;

  const deleteHanlder = async (id: number) => {
    setIsDeleting(true);
    const { success } = await deleteEmpleadoById(id, session!.accessToken);
    if (!success) toast.error("Error al eliminar el Empleado");
    else {
      setEmpleadoList(
        (prevEmpleados) => {
          if(prevEmpleados) return prevEmpleados.filter((empl) => empl.id !== id)
          else return null
        }
      );
      toast.success("Empleado Eliminado");
    }
    setIsDeleting(false);
  };

  return (
    <>
      {empladoList.map((empl) => (
        <EmpleadoCard
          key={empl.id}
          empleado={empl}
          isDeleting={isDeleting}
          handleDelete={deleteHanlder}
        />
      ))}
    </>
  );
};

export default EmpleadoList;
