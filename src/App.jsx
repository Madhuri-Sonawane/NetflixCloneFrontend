import { BrowserRouter, Routes, Route } from "react-router-dom";
import Section1 from "./section/Section1";
import WatchLater from "./pages/WatchLater";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Section1 />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
       <Route path="/watch-later" element={<WatchLater />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/activity" element={<Activity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
