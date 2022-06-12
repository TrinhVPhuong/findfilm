import MoviesRow from '../components/contents/MoviesRow';
import useTitle from '../hooks/useTitle.js'
const TvSeries = (props) => {
  useTitle('TV Series');
  return (
    <div className="content-container">
      <MoviesRow type={"Top Rated"} category = {'tv'}/>
      <MoviesRow type={"Popular"} category = {'tv'}/>
      <MoviesRow type={"On the Air"} category = {'tv'}/>
      <MoviesRow genre={"Action & Adventure"} category = {'tv'}/>
      <MoviesRow genre={"Sci-Fi & Fantasy"} category = {'tv'}/>
      <MoviesRow genre={"War & Politics"} category = {'tv'}/>
      <MoviesRow genre={"Mystery"} category = {'tv'}/>
      <MoviesRow genre={"Documentary"} category = {'tv'}/>
      <MoviesRow genre={"Drama"} category = {'tv'}/>
    </div>
  );
};

export default TvSeries;
