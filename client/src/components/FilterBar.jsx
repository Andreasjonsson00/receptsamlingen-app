
const FilterBar = ({value, onChange}) => {
  return (
    <div className="filter-bar">
      <select value={value} onChange={(e) => onChange(e.target.value)}>

        <option value="">All Categories</option>
        <option value="Main Course">Main Course</option>
        <option value="Starter">Starter</option>
        <option value="Dessert">Dessert</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Quick (<30 min)">Quick (&lt;30 min)</option>
        
      </select>
    </div>
  )
}

export default FilterBar
