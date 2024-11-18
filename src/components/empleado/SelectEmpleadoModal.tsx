import { useEffect, useState } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import CustomModal from "../global/CustomModal";
import { useDebounce } from "@uidotdev/usehooks";
import { useAuth } from "../../context/auth/useContext";
import { Loader2 } from "lucide-react";
import { getAllEmpleados } from "../../lib/api/empleado/empleado.service";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";

type Props<T extends FieldValues> = {
  display: boolean;
  setDisplay: (value: boolean) => void;
  setValue: UseFormSetValue<T>;
  setSelectedEmpleado: (data: string | null) => void;
};


const SelectEmpleadoModal = <T extends FieldValues>({
  display,
  setDisplay,
  setValue,
  setSelectedEmpleado,
}: Props<T>) => {
  const { session } = useAuth();

  const [query, setQuery] = useState("");
  const [empleados, setEmpleados] = useState<EmpleadoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedQuery = useDebounce(query, 500);

  if (!display) return null;

  const onCloseHanlder = () => setDisplay(false);
  const onSubmitHandler = (id: number, nombreEmpleado: string) => {
    return () => {
      setSelectedEmpleado(nombreEmpleado);
      setValue("empleado_id" as Path<T>, id as any, { shouldValidate: true });
      setDisplay(false);
    };
  };

  useEffect(() => {
    const getEmpleados = async () => {
      const { data } = await getAllEmpleados(session!.accessToken, {
        ci: debouncedQuery,
      });
      setEmpleados(data.content);
      setIsLoading(false);
    };
    getEmpleados();
  }, [debouncedQuery]);

  return (
    <CustomModal
      title="Seleccione un usuario"
      type="primary"
      onClose={onCloseHanlder}
    >
      <div className="d-flex flex-column gap-4">
        <input
          className="flex-grow-1 form-control"
          placeholder="Buscar por CI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="d-flex flex-column gap-2">
          {isLoading ? (
            <Loader2 className="mx-auto spin-animation" />
          ) : empleados.length > 0 ? (
            empleados.map((empl) => (
              <button
                className="btn btn-outline-primary btn-sm text-start"
                type="button"
                onClick={onSubmitHandler(empl.id, empl.nombre + "-" + empl.ci)}
                key={empl.id}
              >
                {empl.nombre}
              </button>
            ))
          ) : (
            <p className="text-center text-muted">No se encontraron empleados</p>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default SelectEmpleadoModal;
