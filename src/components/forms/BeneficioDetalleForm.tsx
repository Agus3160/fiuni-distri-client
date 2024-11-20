import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BeneficioDetalleDto } from "../../lib/api/beneficioDetalle/beneficioDetalle.types";

const BeneficioDetalleForm = () => {
  const [empleados, setEmpleados] = useState<{ id: number; nombre: string }[]>([]);
  const beneficioId = localStorage.getItem("beneficioId");  // Obtener el ID desde localStorage
  const { register, handleSubmit } = useForm<BeneficioDetalleDto>({
    defaultValues: {
      beneficio_id: beneficioId ? parseInt(beneficioId) : 0,  // Asegúrate de que el ID se pasa correctamente
    },
  });

  useEffect(() => {
    axios.get("/api/empleados")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error);
      });
  }, []);

  const onSubmit = async (data: BeneficioDetalleDto) => {
    try {
      await axios.post("/api/beneficio-detalles", data);  // Guardar el detalle
      alert("Detalle de beneficio guardado con éxito");
    } catch (error) {
      console.error("Error al guardar detalle:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Monto:</label>
        <input
          {...register("monto", { valueAsNumber: true })}
          type="number"
          className="form-control"
        />
      </div>

      <div>
        <label>Empleado:</label>
        <select {...register("empleado_id")} className="form-control">
          <option value="">Selecciona un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Activo:</label>
        <input
          {...register("activo")}
          type="checkbox"
          className="form-check-input"
        />
      </div>

      <button type="submit">Guardar Detalle</button>
    </form>
  );
};

export default BeneficioDetalleForm;
