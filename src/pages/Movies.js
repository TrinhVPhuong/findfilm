import MoviesRow from '../components/contents/MoviesRow';
import useTitle from '../hooks/useTitle.js'
const Movies = (props) => {
  useTitle('Movies');
  return (
    <div className="content-container">
      <MoviesRow type={"Top Rated"} category = {'movie'}/>
      <MoviesRow type={"Popular"} category = {'movie'}/>
      <MoviesRow genre={"Action"} category = {'movie'}/>
      <MoviesRow genre={"Fantasy"} category = {'movie'}/>
      <MoviesRow genre={"Music"} category = {'movie'}/>
    </div>
  );
};

export default Movies;
