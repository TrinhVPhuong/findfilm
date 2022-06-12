import styled from "styled-components";
import tmdbApi from "../../api/tmdbApi";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { movie, category } = { ...props };
  const imgPath = movie.poster_path || movie.profile_path;
  return (
    // có dấu / phía trước chuỗi -> Route ngang hàng, không có / -> Route con
    <Link to={`/${category}/${movie.id}`}>
      <MovieItem>
        <div className="MovieItem">
          <img
            src={ `${tmdbApi.w500Image(imgPath)}`}
            alt=""
          />
          <p className="MovieName">{movie.title || movie.name}</p>
        </div>
      </MovieItem>
    </Link>
  );
};
export default MovieCard;

const MovieItem = styled.div`
  height: 100%;
  .MovieItem {
    height: inherit;
    border-radius: 20px;
    transition: all 0.5s ease;
    max-width: 600px;
    overflow: hidden;
    position: relative;
    user-select: none;
    text-align: center;
    color: var(--color-white);

    &:hover {
      transform: scale(1.1);
      opacity: 1 !important;
      z-index: 10;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .MovieName {
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      font-weight: bold;
      background: #000000c2;
    }
  }
`;
