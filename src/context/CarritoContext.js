import React, { useEffect, useState } from "react";

const carritoContext = React.createContext();
const { Provider } = carritoContext;

function CarritoProvider({children}){

  const [lista, setLista] = useState([]);

  function agregar(producto, quantity) {
    const productoIndex = lista.findIndex(item => item.name === producto.name);
  
    if (productoIndex !== -1) {
      const nLista = lista.slice();
      nLista[productoIndex].quantity += quantity;
      setLista(nLista);
    } else {
      const nProducto = { ...producto, quantity };
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