import { IMG_BASE } from "../api/tmdb";

export default function WatchLater() {
  const saved = JSON.parse(localStorage.getItem("watchLater")) || [];

  if (!saved.length)
    return <div className="text-white p-6 text-lg">No saved movies yet.</div>;
console.log("Loaded from storage:", saved);

  return (

    
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Watch Later</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {saved.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-3">
              <h3 className="font-bold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
