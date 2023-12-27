import { CiSearch } from "react-icons/ci"
import "../styles/Footer.css";
import FooterLinkStyled from "../styledComponents/FooterLinkStyled";

const Footer = () => {
    return(
        <footer>
            <strong className="strong_item">
                <FooterLinkStyled to={'#'}>Quienes somos</FooterLinkStyled>
            </strong>
            <strong className="strong_item">
                <FooterLinkStyled to={'#'}>vistos recientemente</FooterLinkStyled>
            </strong>
            <div className="div_search">
                <strong>¿Alguna prenda en especial?</strong>
                <div className="search_box">
                    <input type="text" className="search-box" name="search" />
                    <button type="submit" className="search-button"><CiSearch /></button>
                </div>
            </div>  
        </footer>
    )
}

export default Footer;