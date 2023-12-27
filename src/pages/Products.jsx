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
           <>
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
                {subCategories.products
                    .slice()
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
                    }).map((item) => (
                  <div className="card_item" key={item.id}>
                    <div className="card_item_container_img">
                      <img src={imgDefault} alt={item.name}/>
                      <ul className="colors_list">
                        <li style={{ backgroundColor: "red" }}></li>
                        <li style={{ backgroundColor: "black" }}></li>
                        <li style={{ backgroundColor: "orange" }}></li>
                        <li style={{ backgroundColor: "green" }}></li>
                    </ul>
                    </div>
                    <p>
                      <strong>{item.name}</strong>
                      <span>S/.{item.price}</span>
                    </p>                    
                  </div>
                ))}
              </section>
            </>}
        </>
      );      
}

export default ProductsPage;