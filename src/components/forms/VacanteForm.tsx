import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { updateVacanteSchema, VacanteDto, vacanteSchema } from "../../lib/api/Vacante/vacante.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getPuestoById } from "../../lib/api/puesto/puesto.service";
import { toast } from "react-toastify";
import { createVacante, updateVacanteById } from "../../lib/api/Vacante/Vacante.service";
import SelectPuestoInVacantesModal from "../Vacante/SelectPuestoInVacantesModal";
import { Search } from "lucide-react";

type Props = {
  initialValues?: VacanteDto;
};


const VacanteForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const schema = initialValues ? updateVacanteSchema : vacanteSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VacanteDto>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const [displaySearchPuestoModal, setDisplaySearchPuestoModal] = useState(false);
  const [selectedPuesto, setSelectedPuesto] = useState<string | null>(null);
  const [disponible, setDisponible] = useState<boolean | null>(null);

  useEffect(() => {
  }, [disponible]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true"; 
    setDisponible(value);
    setValue("esta_disponible", value); 
  };

  useEffect(() => {
    if (!initialValues) return;

    const fetchInitialValues = async () => {
      const { data } = await getPuestoById(initialValues.puesto_id, session!.accessToken);
      if (!data) {
        navigate("/vacantes");
        toast.error("Error al cargar los datos de la vacante");
      }
      setSelectedPuesto(data.nombre);
    };

    fetchInitialValues();
  }, [initialValues]);

  const onSubmit = async (data: VacanteDto) => {

    const {
      data: res,
      message,
      success,
    } = initialValues
      ? await updateVacanteById(initialValues.id, data, session!.accessToken)
      : await createVacante(data, session!.accessToken);

    if (res && success) {
      toast.success(message);
      navigate("/vacantes");
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      {displaySearchPuestoModal && (
        <SelectPuestoInVacantesModal
          setSelectedPuesto={setSelectedPuesto}
          display={displaySearchPuestoModal}
          setDisplay={setDisplaySearchPuestoModal}
          setValue={setValue}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column gap-2">
          <label htmlFor="puesto">Puesto:</label>
          <div className="d-flex gap-1">
            <input
              {...register("puesto_id")}
              id="puesto"
              className="form-control"
              value={selectedPuesto ? `Puesto - ${selectedPuesto}` : "Selecciona un puesto"}
              disabled={true}
            />
            <button
              type="button"
              title="Buscar un puesto para asignarlo a la Vacante"
              className="btn btn-sm btn-primary"
              onClick={() => setDisplaySearchPuestoModal(true)}
            >
              <Search size={18} />
            </button>
          </div>
          {errors.puesto_id && <div className="invalid-feedback">{errors.puesto_id.message}</div>}
        </div>

        <div className="d-flex flex-column gap-2">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            {...register("descripcion")}
            type="text"
            id="descripcion"
            autoComplete="off"
            placeholder="Descripción de la vacante"
            className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
          />
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
        </div>

        <div>
          <label className="mb-0" htmlFor="esta_disponible">Disponible</label>
          <div className="d-flex flex-row align-items-center gap-3">
            <div>
              <input
                {...register("esta_disponible")}
                type="radio"
                id="disponibleSi"
                name="disponible"
                value="true"
                checked={disponible === true}
                onChange={handleRadioChange}
                className="me-2"
              />
              <label htmlFor="disponibleSi">Sí</label>
            </div>
            <div>
              <input
                {...register("esta_disponible")}
                type="radio"
                id="disponibleNo"
                name="disponible"
                value="false"
                checked={disponible === false}
                onChange={handleRadioChange}
                className="me-2"
              />
              <label htmlFor="disponibleNo">No</label>
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex flex-column align-items-center gap-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn w-100 btn-primary"
          >
            {initialValues ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </>
  );
};

export default VacanteForm;
