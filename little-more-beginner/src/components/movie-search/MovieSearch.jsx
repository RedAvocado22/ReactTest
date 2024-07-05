import axios from "axios";
import { useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import useDebounce from "../hooks/useDebounce";
import LoadingSkeleton from "../loading/LoadingSkeleton";

//https://api.themoviedb.org/3/search/movie?api_key=5dff3c69041fc89761d96386def5dfd3&query={query}

const MovieSearch = () => {
  const initialState = {
    movies: [],
    query: "",
    loading: true,
    errorMsg: "",
  };

  const searchReducer = (state, action) => {
    switch (action.type) {
      case "SET_MOVIES": {
        return { ...state, movies: action.payload };
      }
      case "SET_QUERY": {
        return { ...state, query: action.payload };
      }
      case "SET_LOADING": {
        return { ...state, loading: action.payload };
      }
      case "SET_ERROR": {
        return { ...state, errorMsg: action.payload };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);
  const queryDebounce = useDebounce(state.query, 1000);

  const handleFetchData = useRef({});
  handleFetchData.current = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5dff3c69041fc89761d96386def5dfd3&query=${queryDebounce}`,
      );
      dispatch({
        type: "SET_MOVIES",
        payload: response?.data.results || [],
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
  }, [queryDebounce]);

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Search"
        className="mx-auto mb-10 w-2/4 rounded-lg bg-white p-5 text-lg shadow-lg"
        onChange={(e) =>
          dispatch({
            type: "SET_QUERY",
            payload: e.target.value,
          })
        }
      />
      {state.loading && (
        <div className="grid grid-cols-3 gap-5">
          <MovieItemLoading></MovieItemLoading>
          <MovieItemLoading></MovieItemLoading>
          <MovieItemLoading></MovieItemLoading>
        </div>
      )}
      <div className="grid grid-cols-3 gap-5">
        {!state.loading &&
          state.movies.length > 0 &&
          state.movies.map((item) => (
            <MovieItem key={item.id} data={item}>
              {item.title}
            </MovieItem>
          ))}
      </div>
    </div>
  );
};

const MovieItemLoading = () => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-5">
      <div className="h-[400px] w-full">
        <LoadingSkeleton
          width="100%"
          height="400px"
          radius="8px"
        ></LoadingSkeleton>
      </div>
      <div className="cursor-pointer text-2xl font-bold">
        <LoadingSkeleton height="32px" width="50%"></LoadingSkeleton>
      </div>
      <div className="line-clamp-4 h-full text-[16px]">
        <LoadingSkeleton height="81px"></LoadingSkeleton>
      </div>
      <div>
        <LoadingSkeleton width="25%" height="16px"></LoadingSkeleton>
      </div>
    </div>
  );
};

const MovieItem = ({ data }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-5">
      <div className="h-[400px] w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt=""
          className="h-full w-full cursor-pointer rounded-t-lg object-cover object-top"
        />
      </div>
      <h3 className="cursor-pointer text-2xl font-bold">{data.title}</h3>
      <p className="line-clamp-4 h-full text-[16px]">{data.overview}</p>
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        <span>{data.vote_average}</span>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  data: PropTypes.object,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  vote_average: PropTypes.number,
};
export default MovieSearch;
