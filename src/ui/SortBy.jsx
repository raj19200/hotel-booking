/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParam, setSearchParm] = useSearchParams();
  const sortBy = searchParam.get("sortBy") || "";
  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParm(searchParam);
  }
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
