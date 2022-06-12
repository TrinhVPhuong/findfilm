import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.js";
import Movies from "../pages/Movies.js";
import TvSeries from "../pages/TvSeries.js";
import Search from "../pages/Search.js";
import Detail from "../pages/Detail.js";
import ConfigLayout from "../config/ConfigLayout.js";
const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ConfigLayout />}>
        <Route index element={<Home />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<TvSeries />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default ConfigRoutes;
