import SignUpForm from "../../components/forms/SignUpForm";

export default function SignUp() {
  return (
    <div className="d-flex justify-content-center bg-dark align-items-center mt-5">
      <div
        className="p-4 rounded "
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <SignUpForm />
      </div>
    </div>
  );
}
