import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/useContext";

export default function Home() {
  const { isAuth } = useAuth();
  const session = isAuth();
  return (
    <main role="main">
      <main className="flex-shrink-0">
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 align-items-center justify-content-center">
              <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                  <h2 className="display-5 fw-bolder text-white mb-2">
                    App de Recursos Humanos
                  </h2>
                  <p className="lead fw-normal text-white-50 mb-4">
                    Mediante esta herramienta podras alcanzar tu mayor potencial
                    como empresa y mantener un registro de tus empleados
                  </p>
                  {!session && (
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                      <Link
                        className="btn btn-primary btn-lg px-4 me-sm-3"
                        to="/login"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img
                  className="img-fluid rounded-3 my-5"
                  src="https://www.bizneo.com/blog/wp-content/uploads/2019/02/Politicas-de-Recursos-Humanos.jpg"
                  alt="banner-image"
                />
              </div>
            </div>
          </div>
        </header>
        <hr className="hr"></hr>
        <section className="py-5" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <h2 className="fw-bolder mb-0">
                  Una forma más inteligente de gestionar tu equipo.
                </h2>
              </div>
              <div className="col-lg-8">
                <div className="row gx-5 row-cols-1 row-cols-md-2">
                  <div className="col mb-5 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                      <i className="bi bi-people"></i>
                    </div>
                    <h2 className="h5">Directorio de empleados</h2>
                    <p className="mb-0">
                      Centraliza toda la información de los empleados para
                      agilizar el proceso de gestión de recursos humanos.
                    </p>
                  </div>
                  <div className="col mb-5 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                      <i className="bi bi-clipboard-data"></i>
                    </div>
                    <h2 className="h5">Seguimiento de rendimiento</h2>
                    <p className="mb-0">
                      Monitorea el rendimiento de los empleados con indicadores
                      clave personalizables y herramientas de retroalimentación.
                    </p>
                  </div>
                  <div className="col mb-5 mb-md-0 h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                      <i className="bi bi-calendar-event"></i>
                    </div>
                    <h2 className="h5">Gestión de permisos</h2>
                    <p className="mb-0">
                      Administra fácilmente las solicitudes de tiempo libre,
                      rastrea los días de vacaciones y asegúrate de cumplir con
                      las políticas de la empresa.
                    </p>
                  </div>
                  <div className="col h-100">
                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <h2 className="h5">Gestión de documentos</h2>
                    <p className="mb-0">
                      Almacena y organiza de forma segura los documentos
                      importantes de RRHH, garantizando que los empleados tengan
                      acceso a la información necesaria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="hr"></hr>
        <div className="py-5">
          <div className="container px-5 my-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-10 col-xl-7">
                <div className="text-center">
                  <div className="fs-4 mb-4 fst-italic">
                    "Usar HR Smart ha transformado por completo la forma en que
                    gestionamos nuestro equipo. El tiempo que ahorramos en
                    tareas administrativas nos permite centrarnos en lo que
                    realmente importa: nuestra gente."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
