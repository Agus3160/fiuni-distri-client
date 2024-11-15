import { UseFormSetValue } from "react-hook-form";
import { VacanteDetalleDto } from "../../lib/api/Vacante/vacanteDetalle.types";
import { useAuth } from "../../context/auth/useContext";
import { useEffect, useState } from "react";
import { EmpleadoDto } from "../../lib/api/empleado/empleado.types";
import { useDebounce } from "@uidotdev/usehooks";
import { getAllEmpleados } from "../../lib/api/empleado/empleado.service";
import CustomModal from "../global/CustomModal";


type Props = {
    display: boolean;
    setDisplay: (value: boolean) => void;
    setValue: UseFormSetValue<VacanteDetalleDto>;
    setSelectedEncargado: (data: string | null) => void;
};

const SelectEncargadoInVacanteDetallesModal = ({ display, setDisplay, setValue, setSelectedEncargado}: Props) => {
    const {session } = useAuth();
    const [query, setQuery] = useState("");
    const [empleados, setEmpleados] = useState<EmpleadoDto[]>([]);
    const debouncedQuery = useDebounce(query, 500);

    if (!display) return null;

    const onCloseHanlder = () => setDisplay(false);
    const onSubmitHandler = (id: number, nombre: string) =>{
        return () => {
            setSelectedEncargado(nombre);
            setValue("encargado_id", id, {shouldValidate: true});
            setDisplay(false);
        };
    };


    useEffect (() => {
        const getEmpleados = async () => {
            const { data } = await getAllEmpleados(session!.accessToken, {
                "buscar": debouncedQuery,
            } as any);
        setEmpleados(data.content);
        };
        getEmpleados();
    }, [debouncedQuery]);

    return (
        <CustomModal
            title="Seleccione un Encargado"
            type="primary"
            onClose={onCloseHanlder}
            >
            <div className="d-flex flex-column gap-4">
                <input 
                    className="flex-grow-1 form-control"
                    placeholder="Buscar por nombre"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="d-flex, flex-column gap-2">
                    {empleados.length > 0 &&
                        empleados.map((em)=> (
                            <button
                                className="btn btn-outline-primary btn-sm text-start"
                                type="button"
                                onClick={onSubmitHandler(em.id, em.nombre)}
                                key={em.id}
                            >
                                {em.nombre}
                            </button>
                        ))}
                </div>
            </div>
        </CustomModal>
    );
};


export default SelectEncargadoInVacanteDetallesModal;