import {useState} from "react";

type Props = {}

export default function Login({}: Props) {

  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Email: " + email);
    console.log("Contrasena: " + contrasena);
  }

  return (
      <div className= "d-flex bg-light align-items-center justify-content-center vh-100">
        <div className="p-3 rounded bg-dark-subtle w-25">
          <form onSubmit={handleSubmit}>
            <h3 className= "">Login</h3>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email:</strong></label>
              <input type="email" autoComplete="on" placeholder="Ingrese su email"
                     className="form-control"
              onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
              <label htmlFor="contrasena"><strong>Contraseña:</strong></label>
              <input type="password" autoComplete="off" placeholder="Ingrese su contraseña"
                     className="form-control"
              onChange={(e)=> setContrasena(e.target.value)}/>
            </div>

            <button className="btn btn-success">Ingresar</button>
            <button className="m-3 btn btn-light ">Registrarse</button>
          </form>
        </div>
      </div>

  )
}