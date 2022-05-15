import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = (event) => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div>
      <h1> Hooks News</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <ul>
          {results &&
            results.map((result, index) => (
              <li key={index}>
                <a href={result.url}>{result.title}</a>
              </li>
            ))}
        </ul>
      )}
      {error && <div className="text-red font-bold"> {error.message} </div>}
    </div>
  );
};

export default App;
