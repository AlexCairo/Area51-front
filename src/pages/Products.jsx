import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { listarSubCategorias } from "../services/categorias.service";
import Loader from "../components/Loader";

import imgDefault from "../images/modelo1.jpg"

import "../styles/Products.css"

const ProductsPage = () => {
    
    const { subCategory } = useParams();
    const [ subCategories, setSubCategories ] = useState();
    const [ showLoader, setShowLoader ] = useState(true);
    const [ filterType, setFilterType ] = useState('Fecha')

    const getSubCategories = async (id) => {
        const result = await listarSubCategorias(id);
        setSubCategories(result.data.data);
        setShowLoader(false);
    }

    useEffect(() => {
        let extractedId = subCategory.split("&")[1];
        getSubCategories(extractedId)
    },[subCategory])

    return (
        <>
          {showLoader ? <div className="loader"><Loader /></div> :
           <div className="products_list">
              <div className="filters_box">
                <span className="total_products">
                  {subCategories.products.length} productos
                </span>
                <div className="filters">
                  <label htmlFor="selectFilter">ordenar por : </label>
                  <select id="selectFilter" onChange={(e)=> setFilterType(e.target.value)}>
                    <option value="Fecha">Fecha</option>
                    <option value="Precio">Precio</option>
                    <option value="Nombre A-Z">Nombre A-Z</option>
                    <option value="Nombre Z-A">Nombre Z-A</option>
                  </select>
                </div>
              </div>
              <section className="products_section">
                {subCategories.products.flatMap((product) => (
                    product.variants.slice()
                    .sort((a, b) => {
                        if (filterType === 'Precio') {
                        return a.price - b.price;
                        } else if (filterType === 'Nombre A-Z') {
                        return a.name.localeCompare(b.name);
                        } else if (filterType === 'Nombre Z-A') {
                        return b.name.localeCompare(a.name);
                        } else {
                        return new Date(a.fecha) - new Date(b.fecha);
                        }
                    }) .map((item) => (
                      <div className="card_item" key={item.id}>
                        <div className="card_item_container_img">              
                          <a href={`/${product.name.toLowerCase().replaceAll(" ","-")}/${product.id}/variante/${item.id}`}>
                            <img src={imgDefault} alt={item.name}/>
                          </a>
                          <ul className="colors_list">
                            {Array.from(new Set(product.variants.map(elem => elem.color.value))).map((uniqueColor, index) => (
                                <li key={index} style={{ backgroundColor: uniqueColor }} ></li>
                            ))}
                          </ul>                          
                        </div>
                        <div className="card_item_info">
                          <strong>{item.name}</strong>
                          <div className="card_item_info_prices_and_options">
                            <table className="table_prices">
                              <tbody>
                                {product.has_discount === 1 && (
                                  <tr className="preview_price">
                                    <td>Antes</td>
                                    <td style={{textAlign: "end"}}><del>S/{product.price}</del></td>
                                  </tr>
                                )}
                                <tr className="online_price">
                                  <td>Online</td>
                                  <td style={{textAlign: "end", color : "red"}}>
                                    S/{product.has_discount === 1 ? (product.price - (product.price * (product.percentage_discount / 100))).toFixed(2) : product.price}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div> 
                        {product.has_discount === 1 && <span className="product_discount">{product.percentage_discount}%</span>}
                      </div>
                    ))
                  ))}
              </section>
            </div>}
        </>
      );      
}

export default ProductsPage;