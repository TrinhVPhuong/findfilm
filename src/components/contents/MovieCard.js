import styled from "styled-components";

const MovieCard = (props) => {
  const { movie } = { ...props };
  return (
    <MovieItem>
      <img src={movie} alt='' />
      <p className="MovieName">Movie Name</p>
    </MovieItem>
  );
};
export default MovieCard;

const MovieItem = styled.div`
    border-radius: 10px;
    transition: all 0.5s ease;
    max-width: 350px;
    overflow: hidden;
    position: relative;
    user-select: none;

    &:hover {
      transform: scale(1.1);
      opacity: 1;
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
  
`;
