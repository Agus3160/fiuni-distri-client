import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/nav/NavBar";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Forbiden from "./pages/error/Forbiden";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Role from "./pages/role/Role";
import CreateRole from "./pages/role/CreateRole";
import CreatePuesto from "./pages/puesto/CreatePuesto";
import Puesto from "./pages/puesto/Puesto";
import UpdateRole from "./pages/role/UpdateRole";
import User from "./pages/user/User";
import CreateUser from "./pages/user/CreateUser";
import UpdateUser from "./pages/user/UpdateUser";
import Empleado from "./pages/empleado/Empleado";
import CreateEmpleado from "./pages/empleado/CreateEmpleado";
import UpdatePuesto from "./pages/puesto/UpdatePuesto";
import Beneficio from "./pages/beneficio/beneficio";
import CreateBeneficio from "./pages/beneficio/CreateBeneficio";
import UpdateBeneficio from "./pages/beneficio/UpdateBeneficio";
import EmpleadoDetalles from "./pages/empleado/EmpleadoDetalles";
import EditarEmpleado from "./pages/empleado/EditarEmpleado";
import Evaluaciones from "./pages/evaluacion/Evaluaciones";
import CreateEvaluacion from "./pages/evaluacion/CreateEvaluacion";
import Evaluacion from "./pages/evaluacion/Evaluacion";
import EditarEvaluacionDetalle from "./pages/evaluacion/EditarEvaluacionDetalle";
import EditarEvaluacion from "./pages/evaluacion/EditarEvaluacion";
import CreateVacante from "./pages/vacantes/CreateVacante";
import Vacante from "./pages/vacantes/Vacante";
import UpdateVacante from "./pages/vacantes/UpdateVacante";
import VacanteDetalle from "./pages/vacantes/VacanteDetalle";
import CreateVacanteDetalle from "./pages/vacantes/CreateVacanteDetalle";
import UpdateVacanteDetalle from "./pages/vacantes/UpdateVacanteDetalle";
import ProtectedByRoleRoute from "./components/routes/ProtectedByRoleRoute";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">

          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute />}>



            <Route path="user/">
              <Route path="" element={<User />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="update/:id" element={<UpdateUser />} />
            </Route>

            <Route path="empleado/">
              <Route path="" element={<Empleado />} />
              <Route path="create" element={<CreateEmpleado />} />
              <Route path=":id" element={<EmpleadoDetalles />} />
              <Route path="update/:id" element={<EditarEmpleado />} />
            </Route>


            <Route path="puestos/">
              <Route path="" element={<Puesto />} />
              <Route path="create" element={<CreatePuesto />} />
              <Route path=":id/update" element={<UpdatePuesto />} />
              <Route path="buscar=:string" element={<Puesto />} />
            </Route>

            <Route path="evaluacion/" >
              <Route path="" element={<Evaluaciones />} />
              <Route path="create" element={<CreateEvaluacion />} />
              <Route path=":id/update" element={<EditarEvaluacion />} />
              <Route path=":evaluacionId/detalle/:evaluacionDetalleId/update" element={<EditarEvaluacionDetalle />} />
              <Route path=":id" element={<Evaluacion />} />
            </Route>

            <Route path="vacantes">
              <Route path="" element={<Vacante />} />
              <Route path="create" element={<CreateVacante />} />
              <Route path=":id/update" element={<UpdateVacante />} />
              <Route path=":id/detalles" element={<VacanteDetalle />} />
              <Route path=":id/detalles/create" element={<CreateVacanteDetalle />} />
              <Route path=":id/detalles/:id_detalle/update" element={<UpdateVacanteDetalle />} />
            </Route>

            <Route path="beneficio/">
              <Route path="" element={<Beneficio />} />
              <Route path="create" element={<CreateBeneficio />} />
              <Route path=":id/update" element={<UpdateBeneficio />} />
              <Route path="buscar=:string" element={<Beneficio />} />
            </Route>

          </Route>

          {/* Authorized routes */}
          <Route element={<ProtectedByRoleRoute rol={["ADMIN"]} />}>
            <Route path="role/">
              <Route path="" element={<Role />} />
              <Route path="create" element={<CreateRole />} />
              <Route path="update/:id" element={<UpdateRole />} />
            </Route>
          </Route>

          {/* Error routes */}
          <Route path="forbiden" element={<Forbiden />} />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
