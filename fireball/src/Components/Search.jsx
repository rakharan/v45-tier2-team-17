import { useGlobalContext } from "../context";

const Search = () => {
  const { filters, updateFilters, clearFilters, filterData } =
    useGlobalContext();
  const { name, year, minMass, maxMass, mass, composition } = filters;

  const handleSubmit = (e) => {
    e.preventDefault();
    filterData();
  };
  return (
    <section className="form-container">
      <form
        className="search-form"
        style={{ display: "flex" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex" }}>
          {/* Search input */}

          <div className="form-row">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              value={name}
              onChange={updateFilters}
            />
          </div>

          {/* Year input */}

          <div className="form-row">
            <label htmlFor="year" className="form-label">
              Year Of Strike
            </label>
            <input
              type="range"
              min={1400}
              max={2023}
              value={year}
              className="form-input"
              id="year"
              name="year"
              onChange={updateFilters}
            />
          </div>

          {/* Mass input */}

          <div className="form-row">
            <label htmlFor="mass" className="form-label">
              Meteorite Mass
            </label>
            <input
              type="range"
              min={minMass}
              max={maxMass}
              value={mass}
              className="form-input"
              id="mass"
              name="mass"
              onChange={updateFilters}
            />
          </div>

          {/* Composition input */}

          <div className="form-row">
            <label htmlFor="composition" className="form-label">
              Composition
            </label>
            <select
              type="text"
              id="composition"
              name="composition"
              className="form-select"
              defaultValue="all"
              onChange={updateFilters}
            >
              {composition.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button type="submit">Search</button>
        <button type="button" onClick={clearFilters}>
          Clear
        </button>
      </form>
    </section>
  );
};
export default Search;
