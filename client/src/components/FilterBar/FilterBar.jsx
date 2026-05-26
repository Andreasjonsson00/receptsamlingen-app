// Removed hardcoded option values, now it is more modular and
// prints/ajusts after the 'category' value. 
import styles from "./FilterBar.module.css";

const FilterBar = ({ categories =[], value, onChange}) => {
  return (
    <div className={styles.filterBar}>
      <select className={styles.categorySelect} value={value} onChange={(e) => onChange(e.target.value)}>
        
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
