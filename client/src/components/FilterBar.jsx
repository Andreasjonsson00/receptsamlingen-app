// Removed hardcoded option values, now it is more modular and
// prints/ajusts after the 'category' value. 

const FilterBar = ({value, onChange}) => {
  return (
    <div className="filter-bar">
      <select className="category-select" value={value} onChange={(e) => onChange(e.target.value)}>
        
        <option value="">All Categories</option>
        {categories.map((category)=> (
            <option key={category} value={category}>
                {category}
            </option>
        ))}
        
      </select>
    </div>
  )
}

export default FilterBar
