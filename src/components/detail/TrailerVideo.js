import tmdbApi from "../../api/tmdbApi.js";
import { useState, useEffect } from "react";
import styled from "styled-components";

const TrailerVideo = (props) => {
  const { category, id } = { ...props };
  const [Trailer, setTrailer] = useState({});
  useEffect(() => {
    const getTrailer = async () => {
      try {
        const params = {};
        const response = await tmdbApi.getVideos(category, id, { params });
        const responseTrailer =
          response.results.length > 0 &&
          response.results[
            response.results.map((obj) => obj.type).indexOf("Trailer")
          ];
        setTrailer(responseTrailer);
      } catch (error) {
        console.log(error);
      }
    };
    getTrailer();
  }, [category, id]);
  return (
    <TrailerContainter>
      <h2 className="trailer-title">Trailer</h2>
      <div className="trailer">
        <iframe
          width="480"
          height="320"
          title="Trailer"
          src={`https://www.youtube.com/embed/${Trailer.key}`}
        ></iframe>
      </div>
    </TrailerContainter>
  );
};

export default TrailerVideo;
const TrailerContainter = styled.div`
  .trailer {
    position: relative;
    padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
    height: 0;
    overflow: hidden;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .trailer-title {
    margin-bottom: 15px;
  }
`;
