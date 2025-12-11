import { IMG_BASE } from "../api/tmdb";

export default function Activity() {
  const logs = JSON.parse(localStorage.getItem("activity")) || [];

  if (!logs.length)
    return <div className="text-white p-6 text-lg">No activity yet.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Activity</h1>

      {logs.map((log, i) => (
        <div key={i} className="flex items-center gap-4 mb-4">
          <img
            src={`${IMG_BASE}${log.poster}`}
            className="w-20 h-28 object-cover rounded"
          />
          <div>
            <h3 className="font-bold">{log.title}</h3>
            <p className="text-gray-400 text-sm">Watched on: {log.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
