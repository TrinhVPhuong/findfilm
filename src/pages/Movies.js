import { Navbar } from "./components/header";
import { MoviesRow } from "./components/contents";

const Movies = (props) => {
  return (
    <>
      <Navbar />
      <MoviesRow />
    </>
  );
};

export default Movies;
