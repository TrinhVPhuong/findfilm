import { Link, useLocation } from 'react-router-dom';
import NetflixLogo from "../../assets/images/NetflixLogo.png";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";

function Navbar(props) {
  const navLinks = [
    {
      path: "/home",
      name: "Home",
    },
    {
      path: "/movies",
      name: "Movies",
    },
  ];
  const { pathname } = useLocation();
  console.log(pathname)
  const active = navLinks.findIndex(link => link.path === pathname);

  return (
    <Navigation>
      <div className="navContainer">
        <div className="logo">
          <img src={NetflixLogo} alt="logo" />
        </div>
        <div className="navSearch">
          <MdSearch className="iconSearch" />
          <input
            className="inputSearch"
            type="text"
            placeholder="Search name, genres, actor"
          />
        </div>
        <div className="navLinks">
          <ul>
            {navLinks.map((link, index) => 
              <li key={index} className={`${index === active ? 'active' : ''}`}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Navigation>
  );
}
export default Navbar;

const Navigation = styled.div`
  width: 100%;
  position: fixed;
  top: 0;

  @media only screen and (max-width: 600px) {
    height: 125px;
  }

  .navContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    background-color: var(--color-background);

    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  .logo {
    width: 140px;
    padding: 20px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .navSearch {
    color: var(--color-white);
    position: relative;

    .iconSearch {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 10px;
      left: 5px;
    }
    .inputSearch {
      font-size: 14px;
      padding: 10px;
      background-color: var(--color-background);
      width: 0;
      border: 1px solid var(--color-white);
      color: var(--color-white);
      outline: none;
      opacity: 0;
      cursor: pointer;
      transition: width 0.5s ease;

      &:focus {
        opacity: 1;
        padding-left: 30px;
        width: 300px;
        cursor: text;
        border-radius: 5px;
      }
    }
  }
`;
