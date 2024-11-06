import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth/useContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDto, userDtoSchema } from "../../lib/api/user/user.types";
import { toast } from "react-toastify";
import { createUser, updateUser } from "../../lib/api/user/user.service";
import { useNavigate } from "react-router-dom";
import { roles } from "../../lib/definitions";

type Props = {
  initialValues?: UserDto;
};

const UserForm = ({ initialValues }: Props) => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserDto>({
    resolver: zodResolver(userDtoSchema.partial()),
    defaultValues: {...initialValues, password:""},
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setValue("roles", [value]);
  };

  const onSubmit = async (data: UserDto) => {
    const {
      data: res,
      message,
      success,
    } = initialValues
      ? await updateUser(initialValues.id, data, session!.accessToken)
      : await createUser(data, session!.accessToken);

    if (res && success) {
      toast.success(message);
      navigate("/user");
    } else toast.error(message);
  };

  return (
    <form
      className="d-flex flex-column gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="d-flex flex-column gap-1">
        <label htmlFor="username">Username:</label>
        <input
          {...register("username")}
          type="text"
          id="username"
          autoComplete="off"
          placeholder="Escriba el nombre de usuario"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <label htmlFor="username">Email:</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          autoComplete="off"
          placeholder="example@test.com"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <label htmlFor="password">Password:</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          autoComplete="off"
          placeholder="Ingresa tu contraseña"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <div className="d-flex flex-column gap-1">
        <label htmlFor="password">Rol:</label>
        <select
          onChange={handleRoleChange}
          className={`form-select ${errors.roles ? "is-invalid" : ""}`}
          defaultValue={initialValues?.roles[0]}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.roles && (
          <div className="invalid-feedback">{errors.roles.message}</div>
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
  );
};

export default UserForm;
