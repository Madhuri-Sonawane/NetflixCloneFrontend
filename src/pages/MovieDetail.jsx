import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, IMG_BASE } from "../api/tmdb";

export default function MovieDetail() {
  const logActivity = () => {
  const logs = JSON.parse(localStorage.getItem("activity")) || [];
  logs.push({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("activity", JSON.stringify(logs));
};

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then((res) => {
      setMovie(res);

      const vid = res.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(vid);
    });
  }, [id]);

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <img
        src={`${IMG_BASE}${movie.poster_path}`}
        className="w-64 h-96 object-cover mx-auto rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-6 text-center">{movie.title}</h1>
      <p className="text-gray-300 mt-4 text-center max-w-3xl mx-auto">
        {movie.overview}
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-red-600 px-6 py-2 rounded-md">▶ Play</button>

        {trailer && (
          <button
            className="bg-gray-700 px-6 py-2 rounded-md"
            onClick={() =>
              window.open(`https://youtube.com/watch?v=${trailer.key}`, "_blank")
            }
          >
            🎬 Watch Trailer
          </button>
        )}
         <button
  className="bg-red-600 px-6 py-2 rounded"
  onClick={() => {
    logActivity();
    // Play movie logic
  }}
>
  ▶ Play
</button>

      </div>
    </div>
  );
}
