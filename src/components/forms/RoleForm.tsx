import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth/useContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoleDto, roleSchema } from "../../lib/api/rol/rol.types";
import { createRol, updateRolById } from "../../lib/api/rol/rol.service";
import { toast } from "react-toastify";

type Props = {
  initialValues?: RoleDto;
};

const RoleForm = ({ initialValues }: Props) => {
  const { session } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoleDto>({
    resolver: zodResolver(roleSchema.partial()),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: RoleDto) => {
    const {
      data: res,
      message,
      success,
    } = initialValues
      ? await updateRolById(initialValues.id, data, session!.accessToken)
      : await createRol(data, session!.accessToken);

    if (res && success) {
      toast.success(message);
      reset();
    } else toast.error(message);
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
