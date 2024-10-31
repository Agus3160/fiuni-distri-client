import { useForm } from "react-hook-form";
import { authSignUp } from "../../lib/auth/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "../../lib/auth/auth.types";

export default function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpType) => {
    const { data: session, message, success } = await authSignUp(data);
    if (!success || !session) return alert(message);
    navigate("/login");
  };

  return (
    <form
      className="d-flex flex-column gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="">SignUp</h3>

      {/* Campo de username */}
      <div className="d-flex flex-column gap-1">
        <label htmlFor="username">Username:</label>
        <input
          {...register("username")}
          type="text"
          id="username"
          autoComplete="on"
          placeholder="username"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

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
          Crear cuenta
        </button>
        <Link className="fs-6 fw-ligther" to="/login">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </form>
  );
}
