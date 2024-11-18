import { useFieldArray, useForm } from "react-hook-form";
import {
  editarEvaluacionSchema,
  EditEvaluacionDto,
} from "../../lib/api/evaluacion/evaluacion.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { editEvaluacionById } from "../../lib/api/evaluacion/evaluacion.service";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SelectEmpleadoModal from "../empleado/SelectEmpleadoModal";
import { CirclePlus, Search, X } from "lucide-react";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";

type Props = {
  initialValues: EditEvaluacionDto;
  evaluacionId: number;
  empleado: EmpleadoDto;
};

const EditEvaluacionForm = ({
  initialValues,
  evaluacionId,
  empleado,
}: Props) => {
  const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<string | null>(
    empleado.nombre + "-" + empleado.ci
  );
  const { session } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EditEvaluacionDto>({
    resolver: zodResolver(editarEvaluacionSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "detalles",
  });

  const handleRemoveField = (index: number) => {
    return () => remove(index);
  };

  const handleAddField = () => {
    append({
      criterio: "",
      comentarios: "",
      puntaje: 0,
      evaluacion_id: evaluacionId,
    });
  };

  const submit = async (data: EditEvaluacionDto) => {
    const totalPuntaje = getValues("detalles").reduce(
      (acc, d) => acc + (Number(d.puntaje) || 0),
      0
    );
    const newPromedio = totalPuntaje / getValues("detalles").length;
    const { success } = await editEvaluacionById(
      evaluacionId,
      {
        ...data,
        id: evaluacionId,
        puntaje_general: newPromedio,
      },
      session!.accessToken
    );
    if (!success) toast.error("Error al editar la evaluacion");
    else {
      toast.success("Evaluacion editada con exito");
      navigate("/evaluacion");
    }
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
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              {...register("pendiente")}
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Pendiente
            </label>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <h3>Criterios</h3>
          <div className="d-flex flex-column gap-5">
            {fields.map((field, index) => (
              <div className="d-flex flex-column gap-2" key={field.id}>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="m-0">Criterio #{index + 1}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleRemoveField(index)}
                    type="button"
                  >
                    <X />
                  </button>
                </div>
                <div className="d-flex flex-column gap-1">
                  <input
                    className="form-control"
                    {...register(`detalles.${index}.criterio`)}
                    placeholder={`#${index + 1} Criterio...`}
                  />
                  {errors.detalles &&
                    errors.detalles[index] &&
                    errors.detalles[index].criterio && (
                      <div className="invalid-feedback">
                        {errors.detalles[index].criterio.message}
                      </div>
                    )}
                </div>

                <div className="d-flex flex-column gap-1">
                  <input
                    className="form-control"
                    type="number"
                    min={0}
                    max={100}
                    placeholder={`#${index + 1} Puntaje...`}
                    {...register(`detalles.${index}.puntaje`)}
                  />
                  {errors.detalles &&
                    errors.detalles[index] &&
                    errors.detalles[index].puntaje && (
                      <div className="invalid-feedback">
                        {errors.detalles[index].puntaje.message}
                      </div>
                    )}
                </div>

                <textarea
                  cols={32}
                  className="form-control"
                  {...register(`detalles.${index}.comentarios`)}
                  placeholder="Ingrese un ciomentario... (Opcional)"
                />
              </div>
            ))}
            <button
              onClick={handleAddField}
              disabled={isSubmitting}
              type="button"
              title="Agregar un nuevo detalle"
              className="d-flex gap-2 align-items-center btn btn-secondary"
            >
              <CirclePlus />
              Agregar Nuevo Detalle
            </button>
          </div>
        </div>

        <button className="btn btn-primary mt-5 w-100">Agendar</button>
      </form>
    </>
  );
};

export default EditEvaluacionForm;
