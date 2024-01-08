import { useState, useEffect } from "react";
import CarouselComponent from "../components/CarouselComponent";
import { listarSubCategorias } from "../services/categorias.service";
import "../styles/Index.css";
import Loader from "../components/Loader";

const Index = () => {

    const [ subCategorias, setSubCategorias ] = useState();
    const [ showLoader, setShowLoader ] = useState(true);

    const obtenerSubCategorias = async (id) => {
        const res = await listarSubCategorias(id);
        setSubCategorias(res.data.data);
        setShowLoader(false);
    }

    useEffect(() => {
        const newRandomId = Math.floor(Math.random() * (14 - 2 + 1)) + 2;
        obtenerSubCategorias(newRandomId);
      }, []);

    return(
        <main>
            <CarouselComponent />
            {showLoader ? (
                <div className="loader">
                    <Loader />
                </div>
            ) : (
                <section className="main_grid">
                    {subCategorias.products.slice(0, 4).map(item => (
                        <div className="card_grid" key={item.id}>
                            <div className="card_grid_container_img">
                                <img src={item.image_path} alt={item.name} />
                            </div>                            
                            <p>
                                <strong>{item.name}</strong>
                                <span>S/. {item.price}</span>
                                <button>seleccionar opciones</button>
                            </p>
                        </div>
                    ))}
                </section>
            )}
        </main>
    )
}


export default Index;