import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth/useContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoleSchema, CreateRoleType } from "../../lib/api/rol/rol.types";
import { createRol } from "../../lib/api/rol/rol.service";

type Props = {
  initialValues?: CreateRoleType;
}

const RoleForm = ({ initialValues }: Props) => {
  const { isAuth } = useAuth();
  const session = isAuth();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoleType>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: CreateRoleType) => {
    try {
      const {
        data: res,
        message,
        success,
      } = await createRol(data, session!.accessToken);
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
        <label htmlFor="rol">Rol:</label>
        <input
          {...register("rol")}
          type="text"
          id="rol"
          autoComplete="off"
          placeholder="Escriba el nombre del rol"
          className={`form-control ${errors.rol ? "is-invalid" : ""}`}
        />
        {errors.rol && (
          <div className="invalid-feedback">{errors.rol.message}</div>
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

export default RoleForm;
