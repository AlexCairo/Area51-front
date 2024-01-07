import { useState, useEffect } from "react";

//Components
import SubMenuMobile from "../components/SubmenuMobile"

//Services
import {listarCategorias} from "../services/categorias.service"

//Styles
import "../styles/Navbar.css"

//Icons
import { MdMenu, MdClose, MdOutlineAccountCircle, MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";

//Images
import carrito from "../images/carrito.webp"
import alien1 from "../images/alien1.webp"
import alien2 from "../images/alien2.webp"
import logo2 from "../images/logo2.png"
import SubMenuDesktop from "./SubMenuDesktop";

const Navbar = () => {
    const [ categorias, setCategorias ] = useState();
    const [ openSideMenu, setOpenSideMenu ] = useState(false);
    const [ openMenuHombre, setOpenMenuHombre ] = useState(false);
    const [ openMenuMujer, setOpenMenuMujer ] = useState(false);
    const [ searchBox, setSearchBox ] = useState(false);

    const toogleSearchBox = () => setSearchBox(!searchBox);
    const toggleSideMenu = () => setOpenSideMenu(!openSideMenu);

    const toggleMenuHombre = () => {
        setOpenMenuHombre(!openMenuHombre);
        setOpenMenuMujer(false);
    }    
    
    const toggleMenuMujer = () => {
        setOpenMenuMujer(!openMenuMujer);
        setOpenMenuHombre(false);
    }

    const closeMenuOnSmallScreen = () => {
        if (window.innerWidth >= 1028) {
          setOpenSideMenu(false);
        }
    }

    const obtenerCategorias = async () => {
        const res = await listarCategorias();
        setCategorias(res.data.data);
    }

    useEffect(() => {
        obtenerCategorias();
        window.addEventListener('resize', closeMenuOnSmallScreen);

        return () => {
          window.removeEventListener('resize', closeMenuOnSmallScreen);
        };
    },[]);

    return(
        <header>
            <div className="pre_navbar">
                <strong>
                    13
                    <p>
                        <span className="percentage">%</span>
                        <span className="discount">dscto.</span>
                    </p>
                </strong>
                <span className="pre_navbar_text">en diferentes prendas</span>
                <img src={alien1} alt="alien1" />
            </div> 
            <nav className="navbar">
                <MdMenu className="menu_icon" onClick={toggleSideMenu} />
                <a href="/"><img className="navbar_logo_desktop" src={logo2} alt="logoArea51"/></a>
                <a href="/"><img className="navbar_logo_mobile" src={alien2} alt="logoArea51"/></a>
                <div className="navbar_links" id="navbar_menu">
                    <ul className="navbar_links_list">
                        <li className="hombre_link">
                            <span className="hombre_link_item" onClick={toggleMenuHombre} >Hombre</span>
                        </li>
                        <li className="mujer_link">
                            <span className="mujer_link_item" onClick={toggleMenuMujer} >Mujer</span>
                        </li>
                        <li className="ubicanos_link">
                            <span className="ubicanos_link_item">ubícanos</span>
                        </li>
                        <li className="escribenos_link">
                            <span className="escribenos_link_item">escríbenos</span>
                        </li>
                        <li className="carrito_link">
                            <a href="/carrito" className="carrito_link_item"><img src={carrito} alt="carrito_icon"/></a>
                        </li>
                    </ul>
                </div>
                <div className="navbar_group_icons">
                    <span onClick={toogleSearchBox} className="navbar_icon_search"><CiSearch className="icon_search"/>buscador</span>
                    <a href="/" className="navbar_icon_orders"><FaTruckFast className="icon_orders"/>mis pedidos</a>
                    <a href="/" className="navbar_icon_account"><MdOutlineAccountCircle className="icon_account"/>mi cuenta</a>
                    <a href="/carrito" className="navbar_icon_cart"><MdOutlineShoppingBag className="icon_cart"/>carrito</a>
                </div>
                {categorias && 
                <>
                <SubMenuDesktop list={categorias[0].categories} open={openMenuHombre}/>
                <SubMenuDesktop list={categorias[1].categories} open={openMenuMujer}/>
                </>}
                <div style={{opacity : searchBox && "1"}} className="box_search_mobile">
                    <input type="text" placeholder="Buscar productos"/>
                    <button><CiSearch /></button>
                </div>
            </nav>
            <nav className="sideMenu" style={{left : openSideMenu ? "0" : "-100%"}}>
                {categorias &&
                    <ul className="menu_list">
                    {categorias.map((item, index) => (
                        <SubMenuMobile 
                            key={index}
                            list={item}
                            toggle={toggleSideMenu}
                        />
                    ))}
                </ul> }
                <MdClose className="icon_sideMenu" onClick={toggleSideMenu}/>         
            </nav>
        </header>
    );
}

export default Navbar;