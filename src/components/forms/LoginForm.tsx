import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "../../lib/auth/auth.types";
import { authLogin } from "../../lib/auth/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/auth/useContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    const { data: session, message, success } = await authLogin(data);
    if (!success || !session) return alert(message);
    login(session);
    navigate("/", { replace: true });
  };

  return (
    <form
      className="d-flex flex-column gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="">Login</h3>

      {/* Campo de email */}
      <div className="d-flex flex-column gap-1">
        <label htmlFor="email">Email:</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          autoComplete="on"
          placeholder="email@example.com"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      {/* Campo de contraseña */}
      <div className="d-flex flex-column gap-1">
        <label htmlFor="password">Contraseña:</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          autoComplete="off"
          placeholder="Ingrese su contraseña"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
        />
        {errors.password && (
          <div className="invalid-feedback">
            {errors.password.message as string}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="mt-3 d-flex flex-column align-items-center gap-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn w-100 btn-primary"
        >
          Ingresar
        </button>
        <Link className="fs-6 fw-ligther" to="/signup">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </div>
    </form>
  );
}
