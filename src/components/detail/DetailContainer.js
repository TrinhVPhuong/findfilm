import styled from "styled-components";
import { Link } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi.js";
import TrailerVideo from "../detail/TrailerVideo.js";
import Cast from "./Cast.js";
import Similar from "./Similar.js";
import { useState, useEffect } from "react";
import useTitle from '../../hooks/useTitle.js'

const DetailContainer = (props) => {
  const { category, id, isMovie, handleKey } = { ...props };
  const [MovieorPeople, setMovieorPeople] = useState({});
  const [isRender, setisRender] = useState(false);
  useEffect(() => {
    const getMovieorPeople = async () => {
      try {
        const responseMovieorPeople = await tmdbApi.getDetail(category, id);
        setMovieorPeople(responseMovieorPeople);
        setisRender(
          Object.keys(responseMovieorPeople).length === 0 &&
            responseMovieorPeople.constructor === Object
        );
      } catch (error) {
        setisRender(false);
      }
    };
    getMovieorPeople();
  }, [category, id]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  useTitle(`${MovieorPeople.title ||
    MovieorPeople.original_name ||
    MovieorPeople.name}`)
  return (
    !isRender && (
      <>
        <DetailImg
          bgPath={`${tmdbApi.originalImage(
            MovieorPeople[handleKey("backdrop_path", "profile_path")]
          )}`}
        >
          <div></div>
        </DetailImg>
        <Detail>
          <div className="detail-container">
            <div className="detail-row">
              <div className="detail-background">
                <img
                  src={tmdbApi.w500Image(
                    MovieorPeople[handleKey("poster_path", "profile_path")]
                  )}
                  alt=""
                />
              </div>
              <div className="detail-content">
                <h1 className="detail-name">
                  {MovieorPeople.title ||
                    MovieorPeople.original_name ||
                    MovieorPeople.name}
                </h1>
                <div className="detail-overview">
                  <p>{MovieorPeople[handleKey("overview", "biography")]}</p>
                </div>
                <p className="detail-info">
                  <span className="info-key">
                    <b>{isMovie ? "Release Date: " : "Date of Birth: "}</b>
                  </span>
                  <span className="info-value">
                    {MovieorPeople[handleKey("release_date", "birthday")] ==
                    null
                      ? "Unknown"
                      : MovieorPeople[handleKey("release_date", "birthday")]}
                  </span>
                </p>
                <p className="detail-info">
                  <span className="info-key">
                    <b>{isMovie ? "Only For Adult: " : "Gender: "}</b>
                  </span>
                  <span className="info-value">
                    {MovieorPeople[handleKey("adult", "gender")] === true
                      ? "Yes"
                      : MovieorPeople[handleKey("adult", "gender")] === false
                      ? "No"
                      : MovieorPeople[handleKey("adult", "gender")] === 1
                      ? "Female"
                      : MovieorPeople[handleKey("adult", "gender")] === 2
                      ? "Male"
                      : "Unknown"}
                  </span>
                </p>
                <p className="detail-info">
                  <span className="info-key">
                    <b>
                      {isMovie ? "Average IMDB: " : "Known For Department: "}
                    </b>
                  </span>
                  <span className="info-value">
                    {MovieorPeople[
                      handleKey("vote_average", "known_for_department")
                    ] == null
                      ? "Unknown"
                      : MovieorPeople[
                          handleKey("vote_average", "known_for_department")
                        ]}
                  </span>
                </p>
                <p className="detail-info">
                  <span className="info-key">
                    <b>{isMovie ? "Tag Line: " : "Place of birth: "}</b>
                  </span>
                  <span className="info-value">
                    {MovieorPeople[handleKey("tagline", "place_of_birth")] ==
                    null
                      ? "Unknown"
                      : MovieorPeople[handleKey("tagline", "place_of_birth")]}
                  </span>
                </p>
                <div className="genre-container">
                  {MovieorPeople.genres &&
                    MovieorPeople.genres.map((genre, index) => {
                      return (
                        <Link key={index} to={`/search?keywords=${genre.name}`}>
                          <GenreItem>{genre.name}</GenreItem>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
            <Cast
              category={category}
              id={id}
              isMovie={isMovie}
              handleKey={handleKey}
            ></Cast>
          <Similar category={category} id={id}></Similar>
          {!(category === "person") && (
            <TrailerVideo category={category} id={id} />
          )}
          </div>
        </Detail>
      </>
    )
  );
};

export default DetailContainer;

const DetailImg = styled.div`
  width: 100%;
  height: 70vh;
  opacity: 0.3;
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
  background-image: url(${(props) => props.bgPath});
  div {
    background: linear-gradient(
      to bottom,
      transparent 50%,
      var(--color-background) 80%
    );

    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;
const Detail = styled.div`
  @media screen and (max-width: 768px) {
    body {
      padding-bottom: 40px;
    }
  }
  color: var(--color-white);
  margin-bottom: -30vh;
  .detail-container {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    transform: translateY(-40vh);
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    padding: 0px 20px;
    .detail-row {
      display: flex;
      justify-content: space-around;
    }
    .detail-background {
      flex-basis: calc(50% - 30px);
      margin-right: 30px;
      @media only screen and (max-width: 768px) {
        display: none;
      }
      img {
        width: 100%;
        border-radius: 50px;
        -webkit-box-shadow: 0px 0px 10px 2px #000000;
        box-shadow: 0px 0px 10px 2px #000000;
      }
    }
    .detail-content {
      flex-basis: 50%;
      color: var(--color-white);
      @media only screen and (max-width: 768px) {
        flex-basis: 80%;
      }
      .detail-name {
        margin-bottom: 20px;
      }
      .detail-overview {
        margin-bottom: 20px;
        text-align: justify;
        height: 300px;
        overflow: scroll;
        overflow-x: hidden;
        padding: 0px 5px;
        margin: 0px -5px;
        margin-bottom: 30px;
        @media only screen and (max-width: 768px) {
          height: 200px;
        }
        ::-webkit-scrollbar {
          width: 1px;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: var(--color-white);
          border-radius: 10px;
        }
      }
      .detail-info {
        margin: 5px auto;
      }
    }
    .genre-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      gap: 10px;
      margin: 20px auto;
    }
  }
`;
const GenreItem = styled.div`
  padding: 5px 15px;
  color: var(--color-white);
  border: 1px solid var(--color-white);
  border-radius: 999px;
  background: var(--color-background);
  transition: 0.5s ease;
  &:hover {
    background: var(--color-white);
    color: var(--color-background);
  }
`;
