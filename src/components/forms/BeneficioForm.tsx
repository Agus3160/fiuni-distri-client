import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBeneficio } from "../../lib/api/beneficio/beneficio.service";
import { useAuth } from "../../context/auth/useContext";
import { BeneficioCrearDto } from "../../lib/api/beneficio/beneficio.types";

const BeneficioForm = () => {
  const { session } = useAuth();
  const [beneficio, setBeneficio] = useState<BeneficioCrearDto>({
    nombre: "",
    activo: false,
    porcentaje_de_sueldo: 0,
    fecha_inicio: "", // Inicializamos vacío
    fecha_fin: "", // Inicializamos vacío
  });
  const navigate = useNavigate();

  // Setear la fecha de inicio automáticamente al momento de la creación
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato 'yyyy-mm-dd'
    setBeneficio((prevBeneficio) => ({
      ...prevBeneficio,
      fecha_inicio: today, // Asignamos la fecha actual a fecha_inicio
    }));
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBeneficio({
      ...beneficio,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createBeneficio(
        {
          ...beneficio,
          fecha_inicio: `${beneficio.fecha_inicio}T00:00:00.000Z`,
          fecha_fin: `${beneficio.fecha_fin}T00:00:00.000Z`, // Si la fecha fin está vacía, se maneja así
        },
        session!.accessToken
      );
      const beneficioId = response.data.id; // Suponiendo que el backend retorna el ID
      localStorage.setItem("beneficioId", beneficioId.toString()); // Guardar en localStorage
      navigate("/beneficio-detalle"); // Redirigir sin el ID en la URL
    } catch (error) {
      console.error("Error al crear el beneficio:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={beneficio.nombre}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de inicio:</label>
        <input
          type="date"
          name="fecha_inicio"
          value={beneficio.fecha_inicio}
          onChange={handleChange}
          className="form-control"
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de fin:</label>
        <input
          type="date"
          name="fecha_fin"
          value={beneficio.fecha_fin}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Porcentaje de sueldo:</label>
        <input
          type="number"
          name="porcentaje_de_sueldo"
          value={beneficio.porcentaje_de_sueldo}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          name="activo"
          checked={beneficio.activo}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Activo</label>
      </div>

      <button type="submit" className="btn btn-primary">
        Crear Beneficio
      </button>
    </form>
  );
};

export default BeneficioForm;
