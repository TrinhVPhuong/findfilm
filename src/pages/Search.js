import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import tmdbApi from "../api/tmdbApi";
import styled from "styled-components";
import MovieCard from "../components/contents/MovieCard.js";
import useTitle from "../hooks/useTitle.js";
const Search = () => {
  const useQuery = () => new URLSearchParams(useLocation().search); // tạo hàm lấy giá trị query params trên url
  const queryStr = useQuery().get("keywords");
  const pageStr = useQuery().get("page");
  const category = "multi";
  const [MovieList, setMovieList] = useState();
  const [Page, setPage] = useState({});
  const [ShowNotfound, setShowNotfound] = useState(false);
  const [Navmap, setNavmap] = useState([]);
  useTitle(`Find '${queryStr}'`);
  useEffect(() => {
    const getMovieList = async () => {
      const params = { query: queryStr, page: pageStr };
      try {
        const response = await tmdbApi.search(category, { params });
        setShowNotfound(response.results.length === 0);
        setMovieList(tmdbApi.sortPopularity(response.results));
        setPage({ current: response.page, total: response.total_pages });
        setNavmap(() => {
          switch (true) {
            case response.page < 3:
              return [1, 2, 3, 4, 5];
            case response.page > response.total_pages - 3:
              return [
                response.total_pages - 4,
                response.total_pages - 3,
                response.total_pages - 2,
                response.total_pages - 1,
                response.total_pages,
              ];
            default:
              return [
                response.page - 2,
                response.page - 1,
                response.page,
                response.page + 1,
                response.page + 2,
              ];
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getMovieList();
  }, [queryStr, pageStr]);
  console.log(Navmap);
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
  // move to top when rerender
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  // handle render not found
  return (
    <div className="content-container">
      {MovieList && (
        <>
          <MovieGrid
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
            setwidth={() => {
              switch (true) {
                case windowWidth > 1280:
                  return `${100 / 5}%`;
                case windowWidth > 1024:
                  return `${100 / 4}%`;
                case windowWidth > 768:
                  return `${100 / 3}%`;
                default:
                  return `${100 / 2}%`;
              }
            }}
          >
            {MovieList.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  movie={movie}
                  category={movie.media_type}
                />
              );
            })}
          </MovieGrid>
          <Navigation>
            <div className="navigation-container">
              <ul className="navigation">
                {Page.current !== 1 && (
                  <Link to={`/search?keywords=${queryStr}&page=1`}>{"<<"}</Link>
                )}
                {Navmap.map(
                  (page, index) =>
                    !(page > Page.total) && (
                      <Link
                        key={index}
                        className={(page === Page.current ? "active" : "")}
                        to={`/search?keywords=${queryStr}&page=${page}`}
                      >
                        {page}
                      </Link>
                    )
                )}
                {Page.current !== Page.total && (
                  <Link to={`/search?keywords=${queryStr}&page=${Page.total}`}>
                    {">>"}
                  </Link>
                )}
              </ul>
            </div>
          </Navigation>
        </>
      )}
      {ShowNotfound && (
        <NotFound>
          <h1>Your search for '{`${queryStr}`}' doesn't match any record</h1>
        </NotFound>
      )}
    </div>
  );
};
export default Search;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columms},
    ${(props) => props.setwidth}
  );
  padding: 30px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    padding: 0px;
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
const Navigation = styled.div`
margin-top:20px;
  text-align: center;
  .navigation {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    a {
      display: block;
      width: 50px;
      height: 50px;
      background-color: var(--color-background);
      border: 1px solid var(--color-white);
      color: var(--color-white);
      border-radius: 10px;
      padding: 15px;
      transition: 0.5s ease;
      &:hover,
      &.active {
        color: var(--color-background);
        background-color: var(--color-white);
      }
    }
  }
`;
