// src/components/MovieGrid.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG_BASE } from "../api/tmdb";

export default function MovieGrid({ movies = [] }) {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const s = localStorage.getItem("watchLater");
      if (!s) return [];
      const arr = JSON.parse(s);
      return arr.map((m) => m.id);
    } catch {
      return [];
    }
  });

  // Save movie object to localStorage (watchLater)
  const saveToWatchLater = (movie) => {
    // movie must be defined here (inside map scope we pass it)
    try {
      const saved = JSON.parse(localStorage.getItem("watchLater")) || [];
      const exists = saved.some((m) => m.id === movie.id);
      if (!exists) {
        // store minimal but useful fields (poster_path is TMDB field)
        const item = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path ?? movie.poster, // support both
          vote_average: movie.vote_average ?? movie.rating,
          release_date: movie.release_date ?? movie.year,
        };
        saved.push(item);
        localStorage.setItem("watchLater", JSON.stringify(saved));
        setSavedIds((prev) => [...prev, movie.id]);
        console.log("Saved Movies:", saved);
      } else {
        // optional: remove if already saved (toggle)
        const filtered = saved.filter((m) => m.id !== movie.id);
        localStorage.setItem("watchLater", JSON.stringify(filtered));
        setSavedIds((prev) => prev.filter((id) => id !== movie.id));
        console.log("Removed from saved:", movie.id);
      }
    } catch (err) {
      console.error("Save to watch later failed:", err);
    }
  };

  useEffect(() => {
    // simple entrance animation when grid mounts (if you have GSAP)
    // kept safe: only run if gsap is available globally/imported
    (async () => {
      try {
        const gsap = (await import("gsap")).default;
        const cards = gridRef.current?.querySelectorAll(".movie-card");
        if (cards?.length) {
          gsap.fromTo(
            cards,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
          );
        }
      } catch {
        // gsap not available or dynamic import failed — ignore
      }
    })();
  }, [movies]);

  if (!movies || movies.length === 0) {
    return <div className="text-gray-400 text-lg">No movies found.</div>;
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => {
        const saved = savedIds.includes(movie.id);
        const posterUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : (movie.poster || "/fallback.jpg");

        return (
          <div
            key={movie.id}
            className="movie-card relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover" />

            {/* Save / Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigating to detail page
                saveToWatchLater(movie);
              }}
              className={`absolute bottom-3 right-3 p-2 rounded-full transition transform ${saved ? "bg-red-600" : "bg-black/60 hover:bg-red-600"}`}
              aria-label={saved ? "Remove from watch later" : "Save to watch later"}
            >
              {/* simple disk icon / bookmark */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M5.25 5.25v13.5L12 14.25l6.75 4.5V5.25A2.25 2.25 0 0016.5 3H7.5A2.25 2.25 0 005.25 5.25z" />
              </svg>
            </button>

            <div className="p-4">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">{movie.overview ?? movie.tagline}</p>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-semibold">{movie.vote_average ?? movie.rating}</span>
                </div>
                <div className="text-sm text-gray-300">{(movie.release_date || movie.year || "").toString().slice(0,4)}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
