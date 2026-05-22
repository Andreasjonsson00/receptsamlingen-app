const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;