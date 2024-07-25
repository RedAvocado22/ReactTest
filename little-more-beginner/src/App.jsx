import "./App.css";
import MovieSearch from "./components/movie-search/MovieSearch";
import Photo from "./components/photo-load/Photo";

function App() {
  return (
    <div className="mx-auto mt-5 h-[100vh] max-w-[1280px] rounded-lg p-5">
      <Photo></Photo>
    </div>
  );
}

export default App;
