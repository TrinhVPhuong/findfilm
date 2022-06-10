import "./App.css";
import Navbar from "./components/header/Navbar.js";
import HeaderSlide from "./components/header/HeaderSlide.js";
import MoviesRow from "./components/contents/MoviesRow.js";
import "swiper/css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeaderSlide />
      <MoviesRow />
    </div>
  );
}

export default App;
