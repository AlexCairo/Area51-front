import { useState, useEffect } from "react";

//Components
import SubMenu from "../components/Submenu"

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

const Navbar = () => {
    const [ categorias, setCategorias ] = useState();
    const [ openSideMenu, setOpenSideMenu ] = useState(false);
    const [ openMenuHombre, setOpenMenuHombre ] = useState(false);
    const [ openMenuMujer, setOpenMenuMujer ] = useState(false);
    const [ searchBox, setSearchBox ] = useState(false);

    const toogleSearchBox = () => setSearchBox(!searchBox);

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

    const toggleSideMenu = () => setOpenSideMenu(!openSideMenu);

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
                <img className="navbar_logo_desktop" src={logo2} alt="logoArea51"/>
                <img className="navbar_logo_mobile" src={alien2} alt="logoArea51"/>
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
                            <a href="/" className="carrito_link_item"><img src={carrito} alt="carrito_icon"/></a>
                        </li>
                    </ul>
                </div>
                <div className="navbar_group_icons">
                    <span onClick={toogleSearchBox} className="navbar_icon_search"><CiSearch className="icon_search"/>buscador</span>
                    <a href="/" className="navbar_icon_orders"><FaTruckFast className="icon_orders"/>mis pedidos</a>
                    <a href="/" className="navbar_icon_account"><MdOutlineAccountCircle className="icon_account"/>mi cuenta</a>
                    <a href="/" className="navbar_icon_cart"><MdOutlineShoppingBag className="icon_cart"/>carrito</a>
                </div>
                <div style={{top : openMenuHombre && "100%"}} className="subMenu_hombre">
                    <div className="tendencias_colecciones">
                        <h2>Tendencias y colecciones</h2>
                        <ul>
                            <li><a href="/">Colección de verano</a></li>
                            <li><a href="/">Lo más nuevo</a></li>
                        </ul>
                    </div>
                    <div className="ropa_hombre_por_tipo">
                        <h2>Ropa de hombre por tipo</h2>
                        <ul>
                            <li><a href="/">Abrigos</a></li>
                            <li><a href="/">Camisas</a></li>
                            <li><a href="/">Camisas</a></li>
                            <li><a href="/">Jeans</a></li>
                            <li><a href="/">Pantalones</a></li>
                            <li><a href="/">Polos</a></li>
                            <li><a href="/">Ropa interior</a></li>
                            <li><a href="/">Shorts</a></li>
                            <li><a href="/">Trajes</a></li>
                            <li><a href="/">Zapatos</a></li>                            
                        </ul>
                    </div>
                    <div className="accesorios">
                        <h2>Accesorios</h2>
                        <ul>
                            <li><a href="/">Billeteras</a></li>
                            <li><a href="/">Cinturones</a></li>
                            <li><a href="/">Corbatas</a></li>
                            <li><a href="/">Gorros</a></li>
                            <li><a href="/">Gafas</a></li>
                            <li><a href="/">Guantes</a></li>
                            <li><a href="/">Mochilas</a></li>
                            <li><a href="/">Otros</a></li>
                            <li><a href="/">Relojes</a></li>
                            <li><a href="/">Sombreros</a></li>
                        </ul>
                    </div>
                    <div className="ropa_interior_pijamas">
                        <h2>Ropa interior y pijamas</h2>
                        <ul>
                            <li><a href="/">Boxers</a></li>
                            <li><a href="/">Pijamas</a></li>
                            <li><a href="/">Ropa interior</a></li>
                        </ul>
                    </div>
                    <div className="calzado_hombre">
                        <h2>Calzado hombre</h2>
                        <ul>
                            <li><a href="/">Botas</a></li>
                            <li><a href="/">Casuales</a></li>
                            <li><a href="/">Formales</a></li>
                            <li><a href="/">Otros</a></li>
                            <li><a href="/">Sandalias</a></li>
                            <li><a href="/">Zapatillas</a></li>

                        </ul>
                    </div>
                </div>
                <div style={{top : openMenuMujer && "100%"}}  className="subMenu_mujer">
                    <div className="tendencias_colecciones">
                        <h2>Tendencias y colecciones</h2>
                        <ul>
                            <li><a href="/">Colección de verano</a></li>
                            <li><a href="/">Lo más nuevo</a></li>
                            <li><a href="/">Comodidad</a></li>
                            <li><a href="/">Colección otoño-invierno</a></li>
                        </ul>
                    </div>
                    <div className="ropa_mujer_por_tipo">
                        <h2>Ropa de mujer por tipo</h2>
                        <ul>
                            <li><a href="/">Abrigos</a></li>
                            <li><a href="/">Blusas</a></li>
                            <li><a href="/">Camisetas</a></li>
                            <li><a href="/">Jeans</a></li>
                            <li><a href="/">Pantalones</a></li>
                            <li><a href="/">Polos</a></li>
                            <li><a href="/">Ropa interior</a></li>
                            <li><a href="/">Shorts</a></li>
                            <li><a href="/">Vestidos</a></li>
                            <li><a href="/">Zapatos</a></li>
                        </ul>
                    </div>
                    <div className="accesorios">
                        <h2>Accesorios</h2>
                        <ul>
                            <li><a href="/">Billeteras</a></li>
                            <li><a href="/">Cinturones</a></li>
                            <li><a href="/">Corbatas</a></li>
                            <li><a href="/">Gorros</a></li>
                            <li><a href="/">Gafas</a></li>
                            <li><a href="/">Guantes</a></li>
                            <li><a href="/">Mochilas</a></li>
                            <li><a href="/">Otros</a></li>
                            <li><a href="/">Relojes</a></li>
                            <li><a href="/">Sombreros</a></li>
                        </ul>
                    </div>
                    <div className="ropa_interior_pijamas">
                        <h2>Ropa interior y pijamas</h2>
                        <ul>
                            <li><a href="/">Pijamas</a></li>
                            <li><a href="/">Ropa interior</a></li>
                        </ul>
                    </div>
                    <div className="calzado_mujer">
                        <h2>Calzado mujer</h2>
                        <ul>
                            <li><a href="/">Botas</a></li>
                            <li><a href="/">Casuales</a></li>
                            <li><a href="/">Formales</a></li>
                            <li><a href="/">Otros</a></li>
                            <li><a href="/">Sandalias</a></li>
                            <li><a href="/">Zapatillas</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{opacity : searchBox && "1"}} className="box_search_mobile">
                    <input type="text" placeholder="Buscar productos"/>
                    <button><CiSearch /></button>
                </div>
            </nav>
            <nav className="sideMenu" style={{left : openSideMenu ? "0" : "-100%"}}>
                {categorias &&
                    <ul className="menu_list">
                    {categorias.map((item, index, name) => (
                        <SubMenu 
                            key={index}
                            list={item}
                        />
                    ))}
                </ul> }
                <MdClose className="icon_sideMenu" onClick={toggleSideMenu}/>         
            </nav>
        </header>
    );
}

export default Navbar;