import { useNavigate, useParams } from "react-router-dom";
import { updateVacanteDetalleSchema, VacanteDetalleDto, vacanteDetalleSchema } from "../../lib/api/Vacante/vacanteDetalle.types"
import { useAuth } from "../../context/auth/useContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getVacanteById } from "../../lib/api/Vacante/Vacante.service";
import { VacanteDto } from "../../lib/api/Vacante/vacante.types";
import { createVacanteDetalle, updateVacanteDetalle } from "../../lib/api/Vacante/VacanteDetalle.service";
import { Search } from "lucide-react";
import SelectEncargadoInVacanteDetallesModal from "../Vacante/SelectEncargadoInVacanteDetallesModal";
import { getEmpleadoById } from "../../lib/api/empleado/empleado.service";



type Props = {
    initialValues?: VacanteDetalleDto;
}

const VacanteDetalleForm = ({ initialValues }: Props) => {
    const navigate = useNavigate();
    const { session } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [vacante, setVacante] = useState<VacanteDto>();
    const [isLoading, setIsLoading] = useState(true);

    const [showModal, setShowModal] = useState(false); 


  const toggleModal = () => setShowModal(!showModal);

  const agregarDetalles = () => {
    reset();
    navigate(`/vacantes/${id}/detalles/create`);
    
    setShowModal(false); 
  };


  const noAgregarDetalles = () => {
    navigate(`/vacantes/${id}/detalles`);
    setShowModal(false); 
  };


    const schema = initialValues ? updateVacanteDetalleSchema : vacanteDetalleSchema;

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<VacanteDetalleDto>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });

    const [displaySearchEncargadoModal, setDisplaySearchEncargadoModal] = useState(false);
    const [selectedEncargado, setSelectedEncargado] = useState<string | null>(null);
    const [revisado, setRevisado] = useState<boolean | null>(null);

    useEffect(() => {
    }, [revisado]);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === "true";
        setRevisado(value);
        setValue("fue_revisado", value);
    };

    useEffect(() => {
        if (!initialValues) return;

        const fetchInitialValues = async () => {
            const { data } = await getEmpleadoById(initialValues.encargado_id, session!.accessToken);
            if (!data) {
                navigate("vacantes/" + id + "/detalles");
                toast.error("Error al cargar los datos del detalle de la vacante");
            }
            setSelectedEncargado(data.nombre);
        };

        fetchInitialValues();
    }, [initialValues]);

    useEffect(() => {
        if (!id || Number.isNaN(parseInt(id))) {
            navigate("/vacantes");
            return;
        }

        const getVacanteByIdEffect = async () => {
            try {
                const { data, message, success } = await getVacanteById(parseInt(id), session!.accessToken);

                if (!success || !data) {
                    alert(message);
                } else {
                    setValue("vacante_id", data.id);
                    setVacante(data);
                    setIsLoading(false);
                }
            }
            catch (error) {
                alert("Hubo un problema al obtener la vacante.");
                setIsLoading(false);
            }
        };

        getVacanteByIdEffect();
    }, [id, session, navigate]);




    const onSubmit = async (data: VacanteDetalleDto) => {
        const {
            data: res,
            message,
            success,
        } = initialValues
                ? await updateVacanteDetalle(initialValues.id, data, vacante!.id, session!.accessToken)
                : await createVacanteDetalle(data, vacante!.id, session!.accessToken);

        if (res && success) {
            toast.success(message);

            if (!initialValues) {
                setShowModal(true);
            }
            navigate("/vacantes/"+ id +"/detalles")
        } else {
            toast.error(message);
        }
    };

    return (
        <>
            <div
        className={`modal fade ${showModal ? "show" : ""}`}
        
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }} // Para mostrar el modal
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ¿Deseas agregar algo más?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              ¿Te gustaría agregar más detalles a esta vacante?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={noAgregarDetalles}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={agregarDetalles}
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      </div>



            {displaySearchEncargadoModal && (
                <SelectEncargadoInVacanteDetallesModal
                    setSelectedEncargado={setSelectedEncargado}
                    display={displaySearchEncargadoModal}
                    setDisplay={setDisplaySearchEncargadoModal}
                    setValue={setValue}
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column gap2">
                    <label htmlFor="encargado">Encargado:</label>
                    <div className="d-flex gap-1">
                        <input
                            {...register("encargado_id")}
                            id="encargado"
                            className="form-control"
                            value={selectedEncargado ? `Encargado - ${selectedEncargado}` : "Seleccione un encargado"}
                            disabled={true}
                        />

                        <button
                            type="button"
                            title="Buscar un encargado para asignarlo a la Vacante"
                            className="btn btn-sm btn-primary"
                            onClick={() => setDisplaySearchEncargadoModal(true)}
                        >
                            <Search size={18} />
                        </button>
                    </div>
                    {errors.encargado_id && <div className="invalid-feedback">{errors.encargado_id.message}</div>}
                </div>

                <div>
                    <label className="mb-0" htmlFor="fue_revisado">Revisado</label>
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div>
                            <input
                                {...register("fue_revisado")}
                                type="radio"
                                id="revisadoSi"
                                name="revisado"
                                value="true"
                                checked={revisado === true}
                                onChange={handleRadioChange}
                                className="me-2"
                            />
                            <label htmlFor="revisadoSi">Si</label>
                        </div>
                        <div>
                            <input
                                {...register("fue_revisado")}
                                type="radio"
                                id="revisadoNo"
                                name="revisado"
                                value="false"
                                checked={revisado === false}
                                onChange={handleRadioChange}
                                className="me-2"
                            />
                            <label htmlFor="revisadoNo">No</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column gap-2">
                    <label htmlFor="cv">Detalles CV</label>
                    <input
                        {...register("cv")}
                        type="text"
                        id="cv"
                        autoComplete="off"
                        placeholder="Puntos Resaltantes..."
                        className={`form-control ${errors.cv ? "is-invalid" : ""}`}
                    />
                    {errors.cv && <div className="invalid-feedback">{errors.cv.message}</div>}

                </div>

                <div className="mt-3 d-flex flex-column align-items-center gap-2">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn w-100 btn-primary"
                    >
                        {initialValues ? 'Actualizar' : 'Crear'}
                    </button>
                </div>

            </form>
        </>
    )
};

export default VacanteDetalleForm;