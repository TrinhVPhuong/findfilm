import styled from "styled-components";
import tmdbApi, { Categories } from "../../api/tmdbApi.js";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const HeaderSlide = (props) => {
  const category = Categories.movie;
  const [movieList, setmovieList] = useState([]);
  useEffect(() => {
    const getmovieList = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesByType('Now Playing',category, params);
        setmovieList(response.results);
        
      } catch (error) {
        console.log(error);
      }
    };
    getmovieList();
  }, [category]);
  return (
    <ToprateSlide>
      <div className="slide-container">
        <Swiper modules={[Autoplay]} spaceBetween={0} slidesPerView={1} loop={true} autoplay={{ delay: 4000,disableOnInteraction: false }}>
          {movieList.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieContainer
                background={tmdbApi.originalImage(movie.backdrop_path)}
              >
                <div className="movie-detail">
                  <h1 className="movie-title">{movie.title}</h1>
                  <p className="movie-overview">{movie.overview}</p>
                  <Link className="detail-btn" to={`/${category}/${movie.id}`}>
                    Watch Now
                  </Link>
                </div>
                {/* <img src={tmdbApi.originalImage(movie.backdrop_path)} alt="" /> */}
              </MovieContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ToprateSlide>
  );
};
export default HeaderSlide;

const ToprateSlide = styled.div`
  background-color: #000;
  color: #fff;
  max-height: 100vh;
  overflow: hidden;
  user-select: none;
`;
const MovieContainer = styled.div`
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-image: url(${(props) => props.background});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }
  position: relative;
  height: 100vh;

  .movie-detail {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 20;
    max-width: 1280px;
    width: 70%;
    padding: 0px 10%;
    height: 50vh;
    @media only screen and (max-width: 768px) {
      width: 100%;
      max-width: 80%;
    }
    .movie-title {
      font-size: 3em;
      margin-bottom: 50px;
      @media only screen and (max-width: 768px) {
        font-size: 2em;
        margin-bottom: 30px;
      }
    }
    .movie-overview {
      text-align: justify;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 50px;
      @media only screen and (max-width: 768px) {
        margin-bottom: 20px;
      }
    }
    .detail-btn {
      display: block;
      max-width: 200px;
      padding: 20px 0;
      text-align: center;
      border-radius: 50px;
      border: 2px solid var(--color-white);
      background-color: #0000008c;
      font-weight: bold;
      transition: 0.5s ease;
      &:hover {
        background-color: var(--color-white);
        color: var(--color-background);
      }
    }
  }
`;
