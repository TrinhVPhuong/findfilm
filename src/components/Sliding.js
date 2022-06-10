import Slider from "react-slick";

function Sliding(props) {
    const {MovieSlide,slidesToShow} = {...props}
    const items = [1,2,3,4,5]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1
      };
      console.log(MovieSlide)
      return(
            <Slider {...settings}>
              {items.map(item => <h1>{item}</h1>)}
            </Slider>
      )
}
export default Sliding