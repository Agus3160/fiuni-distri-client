import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useContext";
import {
  CreateEmpleadoDto,
  EmpleadoDto,
  empleadoSchema,
} from "../../lib/api/empleado/empleado.types";
import { createEmpleado } from "../../lib/api/empleado/empleado.service";
import { Search } from "lucide-react";
import { useState } from "react";
import SelectUserModal from "../empleado/SelectUserModal";

type Props = {
  initialValues?: EmpleadoDto;
};

const EmpleadoForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EmpleadoDto>({
    resolver: zodResolver(empleadoSchema.partial()),
  });

  const [displaySearchUserModal, setDisplaySearchUserModal] = useState(false);

  const onSubmit = async (data: CreateEmpleadoDto) => {
    const {
      data: res,
      message,
      success,
    } = await createEmpleado(data, session!.accessToken);

    if (res && success) {
      toast.success(message);
      navigate("/user");
    } else toast.error(message);
  };

  return (
    <>
      {displaySearchUserModal && (
        <SelectUserModal
          display={displaySearchUserModal}
          setDisplay={setDisplaySearchUserModal}
          setValue={setValue}
        />
      )}

      <form
        className="d-flex flex-column gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex flex-column gap-1">
          <label htmlFor="nombre">Username:</label>
          <input
            {...register("nombre")}
            type="text"
            id="nombre"
            autoComplete="off"
            placeholder="Escriba el nombre de usuario"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre.message}</div>
          )}
        </div>

        <div className="d-flex flex-column gap-1">
          <label htmlFor="ci">CI:</label>
          <input
            {...register("ci")}
            type="text"
            id="ci"
            autoComplete="off"
            placeholder="example@test.com"
            className={`form-control ${errors.ci ? "is-invalid" : ""}`}
          />
          {errors.ci && (
            <div className="invalid-feedback">{errors.ci.message}</div>
          )}
        </div>

        <div className="d-flex flex-column gap-1">
          <label htmlFor="puesto">Puesto:</label>
          <div className="d-flex gap-2">
            <input
              className="form-control"
              value={
                getValues("puesto_id")
                  ? `ID - ${getValues("puesto_id")}`
                  : "Selecciona un puesto"
              }
              disabled={true}
            />
            <button
              type="button"
              title="Buscar un puesto para asignarlo al empleado"
              className="btn btn-sm btn-primary"
              onClick={() => setDisplaySearchUserModal(true)}
            >
              <Search size={18} />
            </button>
          </div>
          {errors.puesto_id && (
            <div className="invalid-feedback">{errors.puesto_id.message}</div>
          )}
        </div>

        <div className="d-flex flex-column gap-1">
          <label htmlFor="user">Usuario:</label>
          <div className="d-flex gap-2">
            <input
              className="form-control"
              value={
                getValues("user_id")
                  ? `ID - ${getValues("user_id")}`
                  : "Selecciona un usuario"
              }
              disabled={true}
            />
            <button
              type="button"
              title="Buscar un usuario para asignarlo al empleado"
              className="btn btn-sm btn-primary"
              onClick={() => setDisplaySearchUserModal(true)}
            >
              <Search size={18} />
            </button>
          </div>
          {errors.user_id && (
            <div className="invalid-feedback">{errors.user_id.message}</div>
          )}
        </div>

        <div className="mt-3 d-flex flex-column align-items-center gap-2">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn w-100 btn-primary"
          >
            {initialValues ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EmpleadoForm;
