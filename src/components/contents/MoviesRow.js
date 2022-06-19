import styled from "styled-components";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import tmdbApi, { moviesGenres, tvGenres } from "../../api/tmdbApi";

const MoviesRow = (props) => {
  const { type, genre, similar,id ,category } = { ...props };
  const [MovieList, setMovieList] = useState([]);
  const [isRender, setisRender] = useState(false);
  useEffect(() => {
    const getMovieList = async () => {
      switch (true) {
        case !(genre === undefined): {
          const params = {
            page: 1,
            with_genres: moviesGenres[genre] ?? tvGenres[genre],
          };
          try {
            const response = await tmdbApi.getMoviesByGenre(category, params);
            setMovieList(tmdbApi.sortPopularity(response.results));
            setisRender(true);
          } catch (error) {
            console.log(error);
          }

          break;
        }
        case !(type === undefined): {
          const params = { page: 1 };
          try {
            const response = await tmdbApi.getMoviesByType(type, category, params);
            setMovieList(tmdbApi.sortPopularity(response.results));
            setisRender(true);
          } catch (error) {
            console.log(error);
          }

          break;
        }
        case !(similar === undefined): {
          try {
            const params = {};
            const response = await tmdbApi.getSimilar(category, id, params);
            setMovieList(tmdbApi.sortPopularity(response.results));
            setisRender(true);
          } catch (error) {
            setisRender(false);
          }

          break;
        }
        default:
          console.log("error");
      }
    };
    getMovieList();
  }, [type, genre, similar,id ,category]);
  return (
    isRender && 
    <MovieListRow>
      <h1 className="heading">{type ?? genre ?? similar}</h1>
      <MovieSlider>
        <Swiper
          modules={[Navigation]}
          navigation
          breakpoints={{
            425: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {MovieList.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </MovieSlider>
    </MovieListRow>
  );
};
export default MoviesRow;

const MovieListRow = styled.div`
  background-color: var(--color-background);
  color: var(--color-white);
  position: relative;

  .heading {
    font-size: 20px;
    font-weight: bold;
  }
`;
const MovieSlider = styled.div`
  overflow: hidden;
  &:hover .MovieItem {
    opacity: 0.5;
  }
  .swiper-wrapper {
    margin: 30px 0px;
    text-align: center;
    /* padding: 0px 20px; */
  }

  .swiper-button-prev,
  .swiper-button-next {
    height: 50px;
    width: 50px;
    color: #fff;
  }
`;
