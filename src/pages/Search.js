import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import tmdbApi from "../api/tmdbApi";
import styled from "styled-components";
import MovieCard from "../components/contents/MovieCard.js";
import useTitle from '../hooks/useTitle.js'
const Search = () => {
  const useQuery = () => new URLSearchParams(useLocation().search); // tạo hàm lấy giá trị query params trên url
  const queryStr = useQuery().get("keywords");
  const category = 'multi';
  const [MovieList, setMovieList] = useState();
  const [ShowNotfound,setShowNotfound] = useState(false);
  useTitle(`Find '${queryStr}'`);
  useEffect(() => {
    const getMovieList = async () => {
      const params = { query: queryStr };
      try {
        const response = await tmdbApi.search(category,{ params });
        setShowNotfound(response.results.length === 0);
        setMovieList(tmdbApi.sortPopularity(response.results));
      } catch (error) {
        console.log(error);
      }
    };
    getMovieList();
  }, [queryStr]);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // handle render not found

    return (
    <div className="content-container">
     {MovieList && <MovieGrid
      columms={() => {
        switch (true) {
          case windowWidth > 1280:
            return 5;
          case windowWidth > 1024:
            return 4;
          case windowWidth > 768:
            return 3;
          default:
            return 2;
        }
      }}
      items = {MovieList.length}
    >
      {MovieList.map((movie, index) => {
        return (
          <MovieCard key={index} movie={movie} category={movie.media_type} />
        );
      })}
    </MovieGrid>}
    { ShowNotfound && <NotFound><h1>Your search for '{`${queryStr}`}' doesn't match any record</h1></NotFound>}
    </div>
    )
};
export default Search;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columms}, ${props => props.items === 1 ? `${100/props.columms}%` : 'auto'});
  grid-gap: 30px;
  padding: 30px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    grid-gap: 10px;
    padding: 30px;
  }
  &:hover .MovieItem {
    opacity: 0.5;
  }
  .MovieItem {
    max-width: 400px;
  }
`;
const NotFound = styled.div`
  text-align: center;
  color: var(--color-white);
  font-size: 30px;
`;
