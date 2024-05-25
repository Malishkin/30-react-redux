import { useDispatch } from "react-redux";
import { setTitleFilter } from "../../redux/slices/filterSlice";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter({ payload: e.target.value }));
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
