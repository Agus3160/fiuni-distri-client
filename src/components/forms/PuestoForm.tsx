import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth/useContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPuestoSchema, CreatePuestoType } from "../../lib/api/puesto/puesto.types";
import { createPuesto } from "../../lib/api/puesto/puesto.service";

type Props = {
    initialValues?: CreatePuestoType;
}

const PuestoForm = ({ initialValues }: Props) => {

    const { isAuth } = useAuth();
    const session = isAuth();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<CreatePuestoType>({
        resolver: zodResolver(createPuestoSchema),
        defaultValues: initialValues,
      });

    const onSubmit = async (data: CreatePuestoType) => {
        try {
          const {
            data: res,
            message,
            success,
          } = await createPuesto(data, session!.accessToken);
          if (res && success) alert(message);
        } catch (error) {
          alert(error);
        } finally {
          reset();
        }
    };

  return (
        <form
          className="d-flex flex-column gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="d-flex flex-column gap-1">
            <label htmlFor="puesto">Puesto:</label>
            <input
              {...register("nombre")}
              type="text"
              id="puesto"
              autoComplete="off"
              placeholder="Escriba el nombre del puesto"
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            />
            {errors.nombre && (
              <div className="invalid-feedback">{errors.nombre.message}</div>
            )}
          </div>

          <div className="d-flex flex-column gap-1">
            <label htmlFor="sueldo">Sueldo:</label>
            <input
              {...register("sueldo")}
              type="number"
              id="sueldo"
              autoComplete="off"
              placeholder="Escriba la cantidad del sueldo"
              className={`form-control ${errors.sueldo ? "is-invalid" : ""}`}
            />
            {errors.nombre && (
              <div className="invalid-feedback">{errors.sueldo?.message}</div>
            )}
          </div>
    
          <div className="mt-3 d-flex flex-column align-items-center gap-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn w-100 btn-primary"
            >
              Crear
            </button>
          </div>
        </form>
  );
};

export default PuestoForm;