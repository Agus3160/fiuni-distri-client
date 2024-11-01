import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  paramKey: string;
  placeholder?: string;
};

const BasicSearchBar = ({ paramKey, placeholder }: Props) => {

  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get(paramKey) || "");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if(query === "") return;
    const newParams = new URLSearchParams(params);
    newParams.set(paramKey, query);
    setParams(newParams);
    window.location.reload();
  };

  return (
    <div>
      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control flex-grow-1"
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
          id={`query-${paramKey}`}
        />
        <button
          onClick={handleSearch}
          type="button"
          className="btn btn-primary"
        >
          <Search />
        </button>
      </div>
    </div>
  );
};

export default BasicSearchBar;
