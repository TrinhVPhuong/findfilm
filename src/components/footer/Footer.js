import styled from "styled-components";
import NetflixLogo from "../../assets/images/NetflixLogo.png";
import { AiFillGithub, AiFillMail, AiFillPhone } from "react-icons/ai";
const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        <img src={NetflixLogo} alt="" />
        <p>Trịnh Văn Phương</p>
        <ul>
          <li>
            <a
              href="https://github.com/TrinhVPhuong"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub className="icon"/> https://github.com/TrinhVPhuong
            </a>
          </li>
          <li>
            <a
              href="mailto:<nowiki>trinhphuong06102000@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillMail className="icon"/>trinhphuong06102000@gmail.com
            </a>
          </li>
          <li>
            <a href="tel: (+84)326157955" target="_blank" rel="noreferrer">
              <AiFillPhone className="icon"/> (+84)326 157 955
            </a>
          </li>
        </ul>
      </div>
    </FooterContainer>
  );
};
export default Footer;

const FooterContainer = styled.div`
    /* background-color: #fff; */
    @media only screen and (max-width: 768px) {
        padding-bottom: 60px;
  }
  .footer-content {
    padding: 50px;
    text-align: center;
    color: var(--color-white);
    max-width: 1280px;
    margin: 0 auto;
    p {
      font-size: 2em;
      margin: 20px auto;
    }
    img {
      max-width: 300px;
    }
    ul {
        list-style: none;
      li {
        margin: 10px auto;
        .icon{
            margin-right: 10px;
        }
      }
    }
  }
`;
