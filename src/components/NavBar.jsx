import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function NavBar({
  toggleSidebar,
  query,
  setQuery,
  profileOpen,
  setProfileOpen,
  profile,
  sidebarOpen   // IMPORTANT: Now NavBar receives sidebarOpen properly
}) 
{
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);

  // Animate hamburger using GSAP
  useEffect(() => {
    if (sidebarOpen) {
      gsap.to(line1.current, { rotation: 45, y: 7, duration: 0.22 });
      gsap.to(line2.current, { opacity: 0, duration: 0.18 });
      gsap.to(line3.current, { rotation: -45, y: -7, duration: 0.22 });
    } else {
      gsap.to(line1.current, { rotation: 0, y: 0, duration: 0.22 });
      gsap.to(line2.current, { opacity: 1, duration: 0.18 });
      gsap.to(line3.current, { rotation: 0, y: 0, duration: 0.22 });
    }
  }, [sidebarOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-gray-800">
    
      {/* Hamburger */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle filters"
        className="mr-4 lg:hidden p-2 rounded-md bg-gray-800/60 hover:bg-gray-700"
      >
        <div ref={line1} className="w-6 h-[3px] bg-white mb-1 rounded"></div>
        <div ref={line2} className="w-6 h-[3px] bg-white mb-1 rounded"></div>
        <div ref={line3} className="w-6 h-[3px] bg-white rounded"></div>
      </button>

      {/* Logo */}
      <h1 className="text-red-600 text-2xl font-bold tracking-wide">NETFLIX</h1>

      {/* Search */}
      <div className="hidden md:flex items-center ml-6 flex-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full max-w-2xl px-4 py-2 bg-gray-800 rounded-md text-sm placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Profile */}
      <div className="ml-auto flex items-center gap-3">
        <div className="text-sm text-gray-300 hidden sm:block">Hi, {profile.name}</div>

        <img
          onClick={() => setProfileOpen((prev) => !prev)}
          src={profile.avatar || "https://i.pravatar.cc/40"}
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </nav>
  );
}
