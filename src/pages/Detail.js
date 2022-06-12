import { useParams } from "react-router-dom";
import DetailContainer from '../components/detail/DetailContainer.js'

const Detail = () => {
  const paramsIndex = useParams();
  const { category, id } = { ...paramsIndex };
  const isMovie = category === "movie" || category === "tv";
  const handleKey = (movieKey, peopleKey) => {
    return isMovie ? movieKey : peopleKey;
  };
  return (
    <>
      <DetailContainer category={category} id={id} isMovie={isMovie} handleKey={handleKey}></DetailContainer>
    </>
    )
};
export default Detail;
