import axios from "axios";
import { useEffect, useReducer, useRef } from "react";
// import lodash from "lodash";

export default function SearchNew() {
  // const [hits, setHits] = useState([]);
  // const [query, setQuery] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [url, setUrl] = useState("https://hn.algolia.com/api/v1/search?query=");

  const initialState = {
    hits: [],
    query: "",
    loading: true,
    errorMsg: "",
    url: "https://hn.algolia.com/api/v1/search?query=",
  };

  const searchReducer = (state, action) => {
    switch (action.type) {
      case "SET_HITS": {
        return { ...state, hits: action.payload };
      }
      case "SET_QUERY": {
        return { ...state, query: action.payload };
      }
      case "SET_LOADING": {
        return { ...state, loading: action.payload };
      }
      case "SET_URL": {
        return { ...state, url: action.payload };
      }
      case "SET_ERROR": {
        return { ...state, errorMsg: action.payload };
      }
      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const handleFetchData = useRef({});
  handleFetchData.current = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    try {
      const response = await axios.get(state.url);
      dispatch({
        type: "SET_HITS",
        payload: response.data?.hits || [],
      });
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      dispatch({
        type: "SET_ERROR",
        payload: `An error occurred: ${error}`,
      });
    }
  };

  useEffect(() => {
    handleFetchData.current();
  }, [state.url]);

  // const handleUpdateQuery = lodash.debounce((e) => {
  //   setQuery(e.target.value);
  // }, 500);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: "SET_URL",
        payload: `https://hn.algolia.com/api/v1/search?query=${state.query}`,
      });
    }
  };

  return (
    <div className="mx-auto mb-5 mt-5 w-2/4 rounded-lg bg-white p-5 shadow-md">
      <div className="mb-5 flex gap-x-5">
        <input
          type="text"
          defaultValue={state.query}
          onChange={(e) =>
            dispatch({
              type: "SET_QUERY",
              payload: e.target.value,
            })
          }
          onKeyDown={handleKeyDown}
          className="block w-full rounded-md border border-gray-200 p-5 transition-all"
          placeholder="Search"
        />
        <button
          className={`flex-shrink-0 rounded-md p-5 font-semibold text-white ${state.loading ? "bg-blue-300" : "bg-blue-500"}`}
          onClick={() =>
            dispatch({
              type: "SET_URL",
              payload: `https://hn.algolia.com/api/v1/search?query=${state.query}`,
            })
          }
          disabled={state.loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {!state.loading && state.errorMsg && (
        <p className="mx-auto mt-10 text-center text-red-500">
          {state.errorMsg}
        </p>
      )}
      {state.loading && (
        <div className="loading mx-auto mt-10 h-8 w-8 animate-spin rounded-full border-4 border-r-4 border-blue-500 border-r-transparent"></div>
      )}
      <div className="flex flex-wrap gap-5">
        {!state.loading &&
          state.hits.length > 0 &&
          state.hits.map((item) => {
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
