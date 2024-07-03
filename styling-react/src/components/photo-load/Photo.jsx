import axios from "axios";
import { useEffect, useRef, useState } from "react";

const getRandomPhoto = async (page) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=16`,
    );
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

const Photo = () => {
  const [randomPhoto, setRandomPhoto] = useState([]);
  const [page, setPage] = useState(1);

  const handleLoadMore = useRef({});
  handleLoadMore.current = async () => {
    const images = await getRandomPhoto(page);
    const newImages = [...randomPhoto, ...images];
    setRandomPhoto(newImages);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    handleLoadMore.current();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {randomPhoto.length > 0 &&
          randomPhoto.map((item) => (
            <div
              key={item.id}
              className="h-[200px] rounded-lg bg-white p-3 shadow-md"
            >
              <img
                src={item.download_url}
                alt={item.author}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        <button
          className={`rounded-full bg-amber-800 px-8 py-4 text-white ${page > 4 ? "hidden" : "inline-block"}`}
          onClick={handleLoadMore.current}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Photo;
