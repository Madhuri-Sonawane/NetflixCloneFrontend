import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import MovieGrid from "../components/MovieGrid";
import ProfileSidebar from "../components/ProfileSidebar";

import { fetchGenres, discoverMovies } from "../api/tmdb";

function Section1() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    genreIds: [],
    rating: 0,
    year: "",
  });

  const [profileOpen, setProfileOpen] = useState(false);
const [profile, setProfile] = useState(
  JSON.parse(localStorage.getItem("profile")) || { name: "User", avatar: "" }
);


  const [query, setQuery] = useState("");

  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  // get genres on mount
  useEffect(() => {
    fetchGenres().then((res) => setGenres(res.genres || []));
  }, []);

  // fetch movies when filters or search changes
  useEffect(() => {
    const delay = setTimeout(() => {
      discoverMovies({
        genreIds: filters.genreIds,
        rating: filters.rating,
        year: filters.year,
        query,
      }).then((res) => setMovies(res.results || []));
    }, 400);

    return () => clearTimeout(delay);
  }, [filters, query]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">

    <NavBar
  toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
  query={query}
  setQuery={setQuery}
  profileOpen={profileOpen}
  setProfileOpen={setProfileOpen}
  profile={profile}
  sidebarOpen={sidebarOpen}     // IMPORTANT: add this line
/>

      <ProfileSidebar 
  open={profileOpen} 
  profile={profile} 
  close={() => setProfileOpen(false)} 
/>


      <div className="flex pt-20">
        <Sidebar
          open={sidebarOpen}
          genres={genres}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="flex-1 p-6">
          <MovieGrid movies={movies} />
        </div>
      </div>
    </div>
  );
}

export default Section1;
