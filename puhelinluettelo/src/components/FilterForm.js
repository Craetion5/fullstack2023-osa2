const FilterForm = ({ filterText, handleFilterChange }) => {
    return (
        <div>
            filter names with
            <input value={filterText} onChange={handleFilterChange} />
        </div>
    )
}

export default FilterForm