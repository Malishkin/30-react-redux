import "./Filter.css";

const Filter = () => {
  const handleTitleFilterChange = (e) => {
    // dispatch(setTitleFilter(e.target.value));
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
