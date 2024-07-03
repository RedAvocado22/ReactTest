import axios from "axios";
import { useEffect, useRef, useState } from "react";
import lodash from "lodash";

export default function SearchNew() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetchData = useRef({});
  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`,
      );
      setHits(response.data?.hits || []);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setErrorMsg(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    handleFetchData.current();
  }, [query]);

  const handleUpdateQuery = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 500);

  return (
    <div className="mx-auto mb-5 mt-5 w-2/4 rounded-lg bg-white p-5 shadow-md">
      <input
        type="text"
        defaultValue={query}
        onChange={handleUpdateQuery}
        className="mb-5 block w-full rounded-md border border-gray-200 p-5 transition-all"
        placeholder="Typing your keyword...."
      />
      {!loading && errorMsg && <p>{errorMsg}</p>}
      {loading && (
        <div className="loading mx-auto mt-10 h-8 w-8 animate-spin rounded-full border-4 border-r-4 border-blue-500 border-r-transparent"></div>
      )}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          hits.length > 0 &&
          hits.map((item) => {
            if (!item.title || item.title.length <= 0) return null;
            return (
              <a
                key={item.objectID}
                className="rounded-md bg-gray-100 p-3"
                href={item.url}
                target="_blank"
              >
                {item.title}
              </a>
            );
          })}
      </div>
    </div>
  );
}
