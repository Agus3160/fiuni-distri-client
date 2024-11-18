import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  CreateEvaluacionType,
  createEvaluacionSchema,
} from "../../lib/api/evaluacion/evaluacion.types";
import SelectEmpleadoModal from "../empleado/SelectEmpleadoModal";
import { createEvaluacion } from "../../lib/api/evaluacion/evaluacion.service";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvaluacionForm = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateEvaluacionType>({
    resolver: zodResolver(createEvaluacionSchema),
    defaultValues: {
      criterios: [
        {
          criterio: "",
        },
      ],
    },
  });

  const submit = async (data: CreateEvaluacionType) => {
    const { success } = await createEvaluacion(data, session!.accessToken);
    if (!success) toast.error("Error al crear la evaluacion");
    else {
      toast.success("Evaluacion creada con exito");
      navigate("/evaluacion");
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "criterios",
  });

  const handleRemoveField = (index: number) => {
    return () => remove(index);
  };

  const handleAppendField = () => {
    append({
      criterio: "",
    });
  };

  return (
    <>
      {showEmpleadoModal && (
        <SelectEmpleadoModal
          display={showEmpleadoModal}
          setDisplay={setShowEmpleadoModal}
          setValue={setValue}
          setSelectedEmpleado={setSelectedEmpleado}
        />
      )}
      <form
        onSubmit={handleSubmit(submit)}
        className="d-flex gap-4 flex-column"
      >
        <div className="d-flex flex-column gap-3">
          <div className="">
            <label htmlFor="descripcion" className="form-label">
              Descripcion
            </label>
            <input
              {...register("descripcion")}
              className="form-control"
              id="descripcion"
              placeholder="Ingrese una descripcion"
            />
          </div>
          <div className="">
            <label htmlFor="fecha" className="form-label">
              Fecha
            </label>
            <input
              {...register("fecha")}
              className="form-control"
              min={new Date().toISOString()}
              id="fecha"
              type="datetime-local"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="empleado">
              Empleado:
            </label>
            <div className="d-flex gap-2">
              <input
                id="empleado"
                className="form-control text-muted"
                value={
                  selectedEmpleado
                    ? `Empleado - ${selectedEmpleado}`
                    : "Selecciona un Empleado"
                }
                disabled={true}
              />
              <button
                type="button"
                title="Buscar un usuario para asignarlo al empleado"
                className="btn btn-sm btn-primary"
                onClick={() => setShowEmpleadoModal(true)}
              >
                <Search size={18} />
              </button>
            </div>
            {errors.empleado_id && (
              <div className="invalid-feedback">
                {errors.empleado_id.message}
              </div>
            )}
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <h3>Criterios</h3>
          {fields.map((field, index) => (
            <div className="d-flex gap-2" key={field.id}>
              <input
                className="form-control"
                {...register(`criterios.${index}.criterio`)}
                placeholder={`#${index + 1} Criterio...`}
              />
              <button
                className="btn btn-danger btn-sm"
                onClick={handleRemoveField(index)}
                type="button"
              >
                <X />
              </button>
            </div>
          ))}
          <button
            onClick={handleAppendField}
            disabled={isSubmitting}
            type="button"
            title="Agregar un nuevo detalle"
            className="d-flex gap-2 align-items-center btn btn-secondary"
          >
            <CirclePlus />
            Agregar Nuevo Criterio
          </button>
        </div>
        <button className="btn btn-primary mt-5 w-100">Agendar</button>
      </form>
    </>
  );
};

export default CreateEvaluacionForm;