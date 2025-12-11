export default function Sidebar({ open, genres, filters, setFilters }) {
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

  const toggleGenre = (id) => {
    setFilters((prev) => ({
      ...prev,
      genreIds: prev.genreIds.includes(id)
        ? prev.genreIds.filter((g) => g !== id)
        : [...prev.genreIds, id],
    }));
  };

  return (
    <aside
      className={`w-64 h-screen fixed top-0 left-0 bg-black p-5 border-r border-gray-700 z-50 transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:static lg:translate-x-0 transition-all`}
    >
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <h3 className="text-lg mb-2">Genres</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {genres.map((g) => {
          const active = filters.genreIds.includes(g.id);
          return (
            <button
              key={g.id}
              onClick={() => toggleGenre(g.id)}
              className={`px-3 py-1 text-sm rounded-md border 
                ${active ? "bg-red-600 border-red-600" : "border-gray-400 hover:bg-red-400"}
              `}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      <h3 className="text-lg mb-2">Rating</h3>
      <input
        type="range"
        min="0"
        max="10"
        value={filters.rating}
        onChange={(e) =>
          setFilters((p) => ({ ...p, rating: Number(e.target.value) }))
        }
        className="w-full mb-3"
      />
      <p className="text-red-400">{filters.rating}</p>

      <h3 className="text-lg mb-2">Year</h3>
      <select
        value={filters.year}
        onChange={(e) => setFilters((p) => ({ ...p, year: e.target.value }))}
        className="w-full bg-gray-800 p-2 rounded-md"
      >
        <option value="">All</option>
        {years.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
    </aside>
  );
}
