// import Style from './SearchInput.module.css';

export default function SearchInput({ setSearchInput }) {
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="search"
        id="searchInput"
        className="w-[300px] border-2 p-1"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
    </div>
  );
}
