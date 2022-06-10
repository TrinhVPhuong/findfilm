import styled from "styled-components";
import Slider from "react-slick";

import MovieCard from "./MovieCard";
import { FcPrevious, FcNext } from "react-icons/fc";

const movies = [
  "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg",
  "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg",
  "http://d1j8r0kxyu9tj8.cloudfront.net/files/1618301042CTBAF7i4v3cXFfn.jpg",
  "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg",
  "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg",
  "http://d1j8r0kxyu9tj8.cloudfront.net/files/1618301042CTBAF7i4v3cXFfn.jpg",
  "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg",
  "https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg",
  "http://d1j8r0kxyu9tj8.cloudfront.net/files/1618301042CTBAF7i4v3cXFfn.jpg",
];

function SampleNextArrow(props) {
  return (
    <div {...props}><FcPrevious /></div>
  );
}

function SamplePrevArrow(props) {
  return (
    <div {...props}><FcPrevious /></div>
  );
}

function MoviesRow(props) {
  const SlideSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <FcPrevious />,
    nextArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <MovieListRow>
      <h1 className="heading">Content</h1>
      <MovieSlider>
        <Slider {...SlideSettings}>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Slider>
      </MovieSlider>
    </MovieListRow>
  );
}
export default MoviesRow;

const MovieListRow = styled.div`
  background-color: var(--color-background);
  color: var(--color-white);
  padding: 20px 0;
  position: relative;

  .heading {
    font-size: 20px;
    font-weight: bold;
  }
`;
const MovieSlider = styled.div`
  overflow: hidden;
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
  .slick-track {
    margin: 30px 0px;
    text-align: center;
  }
  .slick-arrow {
    z-index: 20;
    height: 100px;
    width: 40px;
    transition: background-color 0.5s ease;
    polygon {
      fill: #fff;
    }
    &:hover {
      background-color: #000000c2;
    }
  }
  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
  &:hover .MovieItem {
    opacity: 0.5;
  }
`;
