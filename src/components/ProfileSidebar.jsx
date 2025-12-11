import { Link } from "react-router-dom";

export default function ProfileSidebar({ open, profile, close }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 w-72 h-full bg-black text-white z-50 shadow-xl
          transform ${open ? "translate-x-0" : "translate-x-full"}
          transition-transform duration-300
        `}
      >
        <div className="p-5 border-b border-gray-700">
          <img
            src={profile.avatar || "https://i.pravatar.cc/80"}
            className="w-16 h-16 rounded-full mx-auto"
          />
          <h2 className="text-center text-lg font-bold mt-2">
            {profile.name || "User"}
          </h2>
        </div>

        {/* Menu Options */}
        <div className="flex flex-col p-4 gap-4 text-lg">

          <Link to="/profile" onClick={close}>
            Edit Profile
          </Link>

          <Link to="/watch-later" onClick={close}>
            Watch Later
          </Link>

          <Link to="/activity" onClick={close}>
            Your Activity
          </Link>

          <Link to="/" onClick={close} className="text-red-500">
            Exit
          </Link>

        </div>
      </aside>
    </>
  );
}
