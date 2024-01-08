import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../services/productos.services"
import { getVariant } from "../services/variants.service";
import "../styles/DetallePage.css"
import Loader from "../components/Loader";
import { carritoContext } from "../context/CarritoContext";

const DetallePage = () => {
    

    const uniqueColors = new Set();
    const { agregar } = useContext(carritoContext)
    const { idProducto, idVariant } = useParams();
    const [ quantity, setQuantity ] = useState(1);
    const [ showLoaderProduct, setShowLoaderProduct ] = useState(true);
    const [ showLoaderVariante, setShowLoaderVariante ] = useState(true);
    const [ openBoxDescription, setOpenBoxDescription ] = useState(false);
    const [ product, setProduct ] = useState();
    const [ tallaVariant, setTallaVariant ] = useState();
    const [ productVariant, setProductVariant ] = useState();

    const toggleDescription = () => setOpenBoxDescription(!openBoxDescription);

    const obtenerProducto = async (id) => {
        const res = await getProduct(id);
        setProduct(res.data.data); 
        setShowLoaderProduct(false);       
    }

    const obtenerVariante = async (id) => {
        const res = await getVariant(id);
        setProductVariant(res.data.data);
        setShowLoaderVariante(false);
    }

    const handleClick = (e) => {
        const value = e.target.value;
        setTallaVariant(value);
    }

    const handleAddProduct = (variant,cant, product) => {
        agregar(variant, cant, product);
    }

    const disminuirCantidadProducto = () => {
        if(quantity > 1){
            setQuantity(quantity - 1);
        }
    };

    const aumentarCantidadProducto = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        obtenerProducto(idProducto);
        obtenerVariante(idVariant);
    },[idProducto, idVariant])
    
    return(
        <>
            {showLoaderProduct || showLoaderVariante ? <div className="loader"><Loader /></div>
             : 
             <>
             <section className="product_detail_container">
                <div className="product_image_container">
                    <img src={productVariant.images[0].image_path} alt={productVariant.name} />
                </div>  
                <div className="product_info_container">
                    <div className="product_code">
                        <span>{product.brand}</span>
                        <span>Código:{product.sku}</span>                        
                    </div>
                    <h2>{productVariant.name}</h2>
                    <div className="product_price">
                        {product.has_discount === 1 ?
                            <>
                                <del>S/.{productVariant.price}</del>
                                <strong>S/.{(productVariant.price - (productVariant.price * (product.percentage_discount / 100))).toFixed(2)}</strong>
                                <span className="discount_box">{product.percentage_discount}%</span>
                            </>
                        : 
                            <span>S/.{productVariant.price}</span>                            
                        }    
                    </div>
                    <div className="color_info">
                        colores
                        <div className="info_color_list">
                            {product.variants.map(elem => {
                                if (!uniqueColors.has(elem.color.value)) {
                                    uniqueColors.add(elem.color.value);
                                    return (
                                        <Link to={`/${product.name.toLowerCase().replaceAll(" ","-")}/${product.id}/variante/${elem.id}`} className={productVariant.name.includes(elem.color.description) && "selected"} key={elem.id} style={{ backgroundColor: elem.color.value }}> </Link>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="size_info">
                        Tallas
                        <div className="size_container">                            
                            <input onClick={handleClick} type="radio" name="colors" id={productVariant.size.value} value={productVariant.size.value} />                                
                        </div>
                    </div>
                    <div className="cart_info">
                        <div className="cart_button_group">
                            <button className="button_dec" onClick={disminuirCantidadProducto} disabled={quantity <= 1}>-</button>
                            <span>{quantity}</span>
                            <button className="button_inc" onClick={aumentarCantidadProducto} disabled={quantity >= productVariant.stock}>+</button>
                        </div>
                        <button onClick={() => handleAddProduct(productVariant,quantity,product)} disabled = {!tallaVariant && true} className="button_addCart">{tallaVariant ? "añadir al carrito" : "seleccione una talla"}</button>
                    </div>
                    <div className="container_product_description">
                        <button onClick={toggleDescription}><span>Descripción</span>{openBoxDescription ? "-" : "+"}</button>
                        {openBoxDescription && 
                            <div className="description_box">
                                <p>{product.description}</p>
                            </div>}
                    </div>
                </div>
            </section>
             </>}
        </>
    )
}

export default DetallePage;