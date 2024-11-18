import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import CustomModal from "../global/CustomModal";
import { useDebounce } from "@uidotdev/usehooks";
import { useAuth } from "../../context/auth/useContext";
import { getPuestos } from "../../lib/api/puesto/puesto.service";
import { PuestoDto } from "../../lib/api/puesto/puesto.types";
import { VacanteDto } from "../../lib/api/Vacante/vacante.types";

type Props = {
  display: boolean;
  setDisplay: (value: boolean) => void;
  setValue: UseFormSetValue<VacanteDto>;
  setSelectedPuesto: (data: string | null) => void;
};

const SelectPuestoInVacantesModal = ({ display, setDisplay, setValue, setSelectedPuesto }: Props) => {
  const { session } = useAuth();
  const [query, setQuery] = useState("");
  const [vacantes, setVacantes] = useState<PuestoDto[]>([]);
  const debouncedQuery = useDebounce(query, 500);

  if (!display) return null;

  const onCloseHanlder = () => setDisplay(false);
  const onSubmitHandler = (id: number, nombre: string) => {
    return () => {
      setSelectedPuesto(nombre);
      setValue("puesto_id", id, { shouldValidate: true });
      setDisplay(false);
    };
  };

  useEffect(() => {
    const getVacantes = async () => {
      const { data } = await getPuestos(session!.accessToken, {
        "buscar": debouncedQuery,
      } as any);
      setVacantes(data.content);
    };
    getVacantes();
  }, [debouncedQuery]);

  return (
    <CustomModal
      title="Seleccione un Puesto"
      type="primary"
      onClose={onCloseHanlder}
    >
      <div className="d-flex flex-column gap-4">
        <input
          className="flex-grow-1 form-control"
          placeholder="Buscar por puesto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="d-flex flex-column gap-2">
          {vacantes.length > 0 &&
            vacantes.map((puesto) => (
              <button
                className="btn btn-outline-primary btn-sm text-start"
                type="button"
                onClick={onSubmitHandler(puesto.id, puesto.nombre)}
                key={puesto.id}
              >
                {puesto.nombre}
              </button>
            ))}
        </div>
      </div>
    </CustomModal>
  );
};

export default SelectPuestoInVacantesModal;
