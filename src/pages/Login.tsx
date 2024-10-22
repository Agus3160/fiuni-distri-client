import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="p-4 rounded bg-dark-subtle shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <LoginForm />
      </div>
    </div>
  );
}
