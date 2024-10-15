import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AboutUsWithServicesAccordion: React.FC = () => {
  return (
    <section className="bsb-about-6 py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 ">
            <h2 className="mb-4 display-5 text-center">¿Quiénes somos?</h2>
            <p className="text-secondary mb-5 text-center lead fs-4">
              En NicoRRHH, nos especializamos en optimizar y transformar la gestión de recursos humanos para empresas de todos los tamaños. Nuestra misión es simplificar los procesos, mejorar la eficiencia y potenciar el talento de tu equipo. Con un enfoque en soluciones personalizadas y tecnología de vanguardia, nos comprometemos a ofrecer herramientas y servicios que faciliten la administración de personal, el desarrollo de carrera y el cumplimiento de normativas laborales.
              Desde la gestión de nóminas hasta la evaluación del desempeño, nuestra plataforma está diseñada para adaptarse a las necesidades de tu organización, ayudando a construir un ambiente de trabajo más productivo y armonioso. Creemos que el capital humano es el motor de toda empresa exitosa y estamos aquí para asegurar que el tuyo alcance su máximo potencial.
            </p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4 gy-lg-0 align-items-lg-center">
          <div className="col-12 col-lg-6">
            <img
              className="img-fluid rounded border border-dark"
              loading="lazy"
              src="https://recursoshumanosdigital.com/wp-content/uploads/2018/09/10-Acciones-Clave-para-mantener-empleados-felices.jpg"
              alt="About 6"
            />
          </div>
          <div className="col-12 col-lg-6">
            <div className="row justify-content-xl-end">
              <div className="col-12 col-xl-11">
                <div className="accordion accordion-flush" id="accordionAbout6">
                  <div className="accordion-item mb-4 border border-dark">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button bg-transparent fs-4 fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Precios Económicos
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionAbout6"
                    >
                      <div className="accordion-body">
                        Te hacemos precio kpe, escribinos sin miedo y llegamos a un acuerdo ;=)
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item mb-4 border border-dark">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed bg-transparent fs-4 fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Garantía
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionAbout6"
                    >
                      <div className="accordion-body">
                        Si no te gusta te devolvemos casi todo tu dinero
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item mb-4 border border-dark">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed bg-transparent fs-4 fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Originalidad
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionAbout6"
                    >
                      <div className="accordion-body">
                        Te ayudamos a derrocar a la competencia ;)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsWithServicesAccordion;
