import React, { useEffect, useState } from "react";

const carritoContext = React.createContext();
const { Provider } = carritoContext;

function CarritoProvider({children}){

  const [lista, setLista] = useState([]);

  function agregar(variant, quantity, product) {
    const productoIndex = lista.findIndex(item => item.name === variant.name);

    let price_with_discount;

    if(product.has_discount === 1){
        price_with_discount = variant.price - (variant.price * (product.percentage_discount / 100)).toFixed(2);
    }

    if (productoIndex !== -1) {
        const nLista = lista.slice();
        nLista[productoIndex].quantity += quantity;
        if (price_with_discount !== undefined) {
            nLista[productoIndex].price_with_discount = price_with_discount;
        }

        setLista(nLista);
    } else {
        const nProducto = { ...variant, quantity };
        if (price_with_discount !== undefined) {
            nProducto.price_with_discount = price_with_discount;
        }

        setLista([...lista, nProducto]);
    }
}


  function quitar(id) {
    const nLista = lista.filter((elem) => elem.id !== id);
    setLista(nLista);
  }

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setLista(JSON.parse(carritoGuardado));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(lista));
  },[lista]);

    return(
        <Provider value={{lista, agregar, quitar}}>
            {children}
        </Provider>
    )
}

export { CarritoProvider, carritoContext };