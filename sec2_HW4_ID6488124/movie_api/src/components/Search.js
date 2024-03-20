import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const handleYearInputChanges = (e) => {
    setYearValue(e.target.value);
  };

  const handleGenreInputChanges = (e) => {
    setGenreValue(e.target.value);
  };

  const resetInputFields = () => {
    setSearchValue("");
    setYearValue("");
    setGenreValue("");
  };

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    props.search(searchValue, yearValue, genreValue);
    resetInputFields();
  };

  const handleAdvancedSearchButtonClick = (e) => {
    e.preventDefault();
    setShowAdvancedSearch(true);
  };

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowAdvancedSearch(false);
    resetInputFields();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="Enter Title"
      />
      {!showAdvancedSearch ? (
        <input
          onClick={handleSearchButtonClick}
          type="submit"
          value="SEARCH"
        />
      ) : (
        <div>
          <input
            value={yearValue}
            onChange={handleYearInputChanges}
            type="text"
            placeholder="Enter year"
          />
          <input
            value={genreValue}
            onChange={handleGenreInputChanges}
            type="text"
            placeholder="Enter genre"
          />
          <input
            onClick={handleSearchButtonClick}
            type="submit"
            value="SEARCH"
          />
          <button onClick={handleBackButtonClick}>BACK</button>
        </div>
      )}
      {!showAdvancedSearch && (
        <button onClick={handleAdvancedSearchButtonClick}>
          ADVANCED SEARCH
        </button>
      )}
    </form>
  );
};

export default Search;
