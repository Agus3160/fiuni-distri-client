import { useSearchParams } from "react-router-dom";

type Props = {
  paramsInit?: URLSearchParams;
};

const CommonsFilterBar = ({ paramsInit }: Props) => {
  const [params, setParams] = useSearchParams(paramsInit);

  const startDate = params.get("start-date");
  const endDate = params.get("end-date");

  const handleIncludeDeletedChange = () => {
    const newParams = new URLSearchParams(params);
    const includeDeleted = newParams.get("include-deleted") === "true";
    if (includeDeleted) {
      newParams.delete("include-deleted");
    } else {
      newParams.set("include-deleted", "true");
    }
    setParams(newParams);
    window.location.reload();
  };

  const handleDateChange = (type: "start" | "end") => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newParams = new URLSearchParams(params);
      newParams.set(type + "-date", new Date(value).toISOString());
      setParams(newParams);
      window.location.reload();
    };
  };

  return (
    <div className="d-flex flex-md-row flex-column w-full bg-light-subtle shadow-lg p-2 rounded justify-content-between align-items-md-center gap-2">
      <div className="form-check m-0">
        <input
          className="form-check-input"
          type="checkbox"
          id="include-deleted"
          checked={params.get("include-deleted") === "true"}
          onChange={handleIncludeDeletedChange}
        />
        <label
          title="Incluir registros eliminados"
          htmlFor="include-deleted"
          className="form-check-label"
        >
          eliminados
        </label>
      </div>
      <div className="d-flex gap-2 flex-sm-row flex-column">
        <div className="d-flex gap-1 align-items-center ">
          <label
            title="Desde fecha"
            htmlFor="from-date"
            className="form-label m-0"
          >
            desde
          </label>
          <input
            type="date"
            value={startDate ? startDate.split("T")[0] : undefined}
            onChange={handleDateChange("start")}
            className="form-control"
            id="from-date"
          />
        </div>
        <div className="d-flex gap-1 align-items-center ">
          <label title="Hasta fecha" htmlFor="to-date" className="form-label m-0">
            hasta
          </label>
          <input
            value={endDate ? endDate.split("T")[0] : undefined}
            onChange={handleDateChange("end")}
            type="date"
            max={new Date().toISOString().split("T")[0]}
            className="form-control"
            id="to-date"
          />
        </div>
      </div>
    </div>
  );
};

export default CommonsFilterBar;
