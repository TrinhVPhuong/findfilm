import styled from "styled-components";
import { Link } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi.js";
import { useState, useEffect } from "react";
const Cast = (props) => {
  const { category, id,isMovie,handleKey } = { ...props };
  const [Casts, setCasts] = useState([]);
  const [isRender, setisRender] = useState(false);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getCasts = async () => {
      try {
        const params = {};
        const responseCredit = await tmdbApi.getCredit(category, id, {
          params,
        });
        const temp = [...new Map(responseCredit.cast.map(item => [item['name'], item])).values()] // lọc trùng theo name
        setCasts(tmdbApi.sortPopularity(temp).slice(0,6));
        setisRender(true)
      } catch (error) {
        console.log(error);
        setisRender(false)
      }
    };
    getCasts();
  }, [category, id]);
  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    isRender && <CastContainer>
      <h2 className="cast-title">Cast</h2>
      <Castgrid
        columms={() => {
          switch (true) {
            case windowWidth > 1024:
              return 6;
            case windowWidth > 768:
              return 3;
            default:
              return 2;
          }
        }}
        items = {Casts.length}
      >
        {Casts &&
          Casts.map((cast, index) => (
            <CastItem key={index}>
              <Link
                className="cast-bounder"
                to={`/${isMovie ? "person" : "movie"}/${cast.id}`}
              >
                <img
                  src={tmdbApi.w500Image(
                    cast[handleKey("profile_path", "poster_path")]
                  )}
                  alt=""
                />
                <p className="cast-name">{cast[handleKey("name", "title")]}</p>
              </Link>
            </CastItem>
          ))}
      </Castgrid>
    </CastContainer>
  );
};
export default Cast;
const CastContainer = styled.div`
    color: var(--color-white);
  .cast-title {
    color: var(--color-white);
    max-width: 1280px;
    margin: 0 auto;
    margin-bottom: 15px;
  }
`;
const Castgrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columms}, ${props => props.items < props.columms  ? `${100/props.columms}%` : 'auto'});
  gap: 10px;
  flex-basis: 100%;
  max-width: 1280px;
  margin: 0 auto;
  color: var(--color-white);
`;
const CastItem = styled.div`
  .cast-bounder {
    display: block;
    height: 100%;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
  .cast-name {
    position: absolute;
    bottom: 0;
    padding: 10px;
    display: block;
    width: 100%;
    background: #000000d1;
  }
`;
