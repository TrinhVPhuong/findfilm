import { Link, useLocation, useNavigate } from "react-router-dom";
import NetflixLogo from "../../assets/images/NetflixLogo.png";
import { MdSearch } from "react-icons/md";
import { BiArrowToTop } from "react-icons/bi";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Navbar = (props) => {
  const navLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/movie",
      name: "Movies",
    },
    {
      path: "/tv",
      name: "Tv Series",
    },
  ];

  const { pathname } = useLocation(); //lấy ra path từ url trên trình duyệt
  const active = navLinks.findIndex((link) => link.path === pathname); //Tìm pathname trong navLinks,  trả về index
  const [SearchQuery, setSearchQuery] = useState("");
  const Navigate = useNavigate();
  const handleSearchQuery = (key) => {
    if (key.code === "Enter") {
      const queryStr = SearchQuery.replaceAll(" ", "+");
      SearchQuery.length > 0
        ? Navigate(`/search?keywords=${queryStr.trim()}`)
        : Navigate("/");
      setSearchQuery("");
    }
  };
  const [navfixed, setnavfixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setnavfixed(true);
      } else {
        setnavfixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const gotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Navigation
      backgroundColor={navfixed ? "var(--color-background)" : "transparent"}
    >
      <div className="navContainer">
        <div className="logo">
          <Link to="/">
            <img src={NetflixLogo} alt="logo" />
          </Link>
        </div>
        <div className="navSearch">
          <MdSearch className="iconSearch" />
          <input
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(key) => handleSearchQuery(key)}
            className="inputSearch"
            type="text"
            placeholder="Search name, genres, actor"
          />
        </div>
        <div className="navLinks">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index} className={`${index === active ? "active" : ""}`}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {navfixed && <div className="gotoTop" onClick={gotoTop}>
          <BiArrowToTop />
        </div>}
      </div>
    </Navigation>
  );
};
export default Navbar;

const Navigation = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  height: 100px;
  z-index: 1000;
  background-color: ${(props) => props.backgroundColor};
  transition: all 0.5s ease;
  @media only screen and (max-width: 768px) {
    height: 125px;
  }

  .navContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    @media only screen and (max-width: 768px) {
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
        width: 280px;
        cursor: text;
        border-radius: 5px;
      }
    }
  }
  .navLinks {
    margin-left: auto;
    color: var(--color-white);
    height: 100%;
    width: 25%;

    text-align: center;
    @media only screen and (max-width: 768px) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background-color: var(--color-background);
      font-size: 1em;
    }
    ul {
      list-style: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 25px;
      @media only screen and (max-width: 768px) {
        justify-content: space-around;
        font-size: 1em;
      }
      li {
        display: block;
        font-weight: bold;
        position: relative;
        margin: 0 15px;
        &:before {
          content: "";
          width: 0;
          height: 2px;
          background-color: red;
          display: block;
          border-radius: 2px;
          position: absolute;
          bottom: -5px;
          left: 50%;
          transition: all 0.5s ease;
        }
        &.active:before {
          width: 100%;
          left: 0;
        }
      }
    }
  }
  .gotoTop {
    padding: 10px 0px;
    position: fixed;
    width: 50px;
    height: 50px;
    bottom: 50px;
    right: 50px;
    border: 1px solid var(--color-white);
    background-color: var(--color-background);
    border-radius: 5px;
    color: var(--color-white);
    font-size: 25px;
    text-align: center;
    transition: 0.5s ease;
    &:hover {
      background-color: var(--color-white);
      color: var(--color-background);
    }
  }
`;
