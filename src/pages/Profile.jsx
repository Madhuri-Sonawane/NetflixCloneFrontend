import { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    avatar: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) setProfile(saved);
  }, []);

  const saveProfile = () => {
localStorage.setItem("profile", JSON.stringify(profile));

    alert("Profile updated");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <label className="block mb-4">
        <span className="text-gray-300">Name</span>
        <input
          type="text"
          className="mt-1 p-2 bg-gray-800 rounded w-full"
          value={profile.name}
          onChange={(e) =>
            setProfile((p) => ({ ...p, name: e.target.value }))
          }
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-300">Avatar URL</span>
        <input
          type="text"
          className="mt-1 p-2 bg-gray-800 rounded w-full"
          value={profile.avatar}
          onChange={(e) =>
            setProfile((p) => ({ ...p, avatar: e.target.value }))
          }
        />
      </label>

      <button
        onClick={saveProfile}
        className="bg-red-600 px-6 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
