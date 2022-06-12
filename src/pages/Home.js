import HeaderSlide from "../components/header/HeaderSlide.js";
import useTitle from '../hooks/useTitle.js'
const Home = (props) => {
  useTitle('Home')
  return <HeaderSlide />;
};

export default Home;
