import { useContext, useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdOutlinePayments } from "react-icons/md";
import { PiHandbagDuotone } from "react-icons/pi"
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { carritoContext } from "../context/CarritoContext";
import { listarCostosEnvio } from "../services/carrito.service";
import { createOrder, createShipment, paymenMethods } from "../services/orders.service";
import { CiShoppingCart } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import "../styles/CarritoPage.css"
import PaymentMethods from "../components/PaymentMethods";

const CarritoPage = () => {
    
    const [ listadoEnvios, setListadoEnvios ] = useState();
    const { lista, quitar } = useContext(carritoContext);
    const [ total, setTotal ] = useState(0);
    const [ subTotal, setSubTotal ] = useState(0);
    const [ precioEnvio, setPrecioEnvio ] = useState(0);
    const [ openBoxEnvios, setOpenBoxEnvios ] = useState(true);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ listaDepartamentos, setListaDepartamento] = useState();
    const [ listaDistrito, setListadoDistrito ] = useState();
    const [ selectedDistrito, setSelectedDistrito ] = useState('');
    const [ selectedDepartamento, setSelectedDepartamento ] = useState('');
    const [ selectedProvincia, setSelectedProvincia ] = useState('');
    const [ districtId, setDistrictId ] = useState();
    const [ listPaymentMethods, setListPaymentMethods ] = useState();
    const navigate = useNavigate();

    const toggle = () => setOpenBoxEnvios(!openBoxEnvios);
    const handleRadioClick = () => setIsChecked(!isChecked);

    const handleRemove = (producto) => {
        quitar(producto);
    }

    const handleBack = () => {
        navigate('/');
    }

    const obtenerListadoEnvios = async () => {
        const res = await listarCostosEnvio();
        setListadoEnvios(res.data.data);
    }

    const getPaymentMethods = async() => {
        const res = await paymenMethods();
        setListPaymentMethods(res.data.data);
    }

    const handleChangeDistrito = (e) => {
        const value = e.target.value;
        if (value !== "") {
            setSelectedDistrito(value);
            const listaDepartamentos = listadoEnvios.filter(elem => elem.name === value);
            setListaDepartamento(listaDepartamentos)
        }
    };

    const handleCreateOrder = async () => {
        const order = {
            user_id: 1,
            items: lista.map(item => {
                const price = parseInt(item.price_with_discount) || parseInt(item.price);
                return {
                    product_variant_id: item.id,
                    price: price,
                    quantity: item.quantity
                };
            })
        };
        console.log(order);
        const res = await createOrder(order);
        const id_order = res.data.data.order_id;
        const resShipment = await createShipment(id_order,2,districtId);
        console.log(resShipment.data);
    }    

    const handleChangeDepartamento = (e) => {
        const value = e.target.value;
        if (value !== "") {
            setSelectedDepartamento(value);
            const departamento = listaDepartamentos[0].provinces.filter(elem => elem.id == value);
            const listaPronvincias = departamento[0].districts;
            setListadoDistrito(listaPronvincias);
        }
    };

    const handleChangeProvincia = (e) => {
        const value = e.target.value;        
        const el = document.getElementById('provinciaSelect');
        const sI = el.selectedIndex;
        const sId = el.options[sI].getAttribute('id');
        setDistrictId(sId);
        setSelectedProvincia(value);
        if(e.target.value){
            const precioCiudad = parseInt(e.target.value);
            setPrecioEnvio(Math.round(precioCiudad));
        }else{
            setPrecioEnvio(0);
        }
    };

    useEffect(() => {
        obtenerListadoEnvios();
        getPaymentMethods();

        const initValue = 0;
        
        const nSubTotal = lista.reduce((previousValue, currentObj) => {
            const price = currentObj.price_with_discount || currentObj.price;
            return previousValue + (price * currentObj.quantity);
        }, initValue);
        
        setSubTotal(Math.round(nSubTotal));
        
        if (isChecked) {
            setTotal(subTotal);
        } else {
            setTotal(subTotal + precioEnvio);
        }
    }, [lista, precioEnvio, subTotal, isChecked]);

    return(
        <div className="section_order">
        <section className="carrito-info">
                {lista.length <= 0 ? <div className="carrito-sinProductos"><PiHandbagDuotone className="icon-sinProductos" />No tienes productos añadidos <button onClick={handleBack} className="btn-seguirComprando">Seguir comprando</button></div>
                 : <>
                 <section className="purchasing_process">
                    <div><CiShoppingCart className="icon_process"/><span>Crear orden</span></div>
                    <div><MdOutlinePayments className="icon_process"/><span>Pago</span></div>
                 </section>
                 <section></section>
                 <div className="carrito-productos">                   
                    {lista.map((elem => (
                        <div className="carrito-productos-item" key={elem.id}>                        
                            <div className="carrito-productos-item-container-img">
                                <img src={elem.images[0].image_path} alt={elem.name} />                               
                            </div>
                            <p>
                                <span className="nombre-producto">{elem.name}</span>
                                <strong>{`S/${elem.price_with_discount ? Math.round(elem.price_with_discount): Math.round(elem.price)}`}</strong>
                                <span><strong>Cantidad : </strong>{elem.quantity}</span>
                            </p>
                            <div className="carrito-productos-item-group-button">
                                <button onClick={() => handleRemove(elem.id)} className="button-remove"><AiOutlineClose/></button>
                            </div>
                        </div>
                    )))}
                 </div>
                    <div className="carrito-info-resumen">
                        <h4>RESUMEN</h4>
                        <div className="carrito-info-resumen-table">
                            <div className="carrito-info-estimacion-impuestos">Estimación de envío e impuestos <button className="carrito-info-more" onClick={toggle}><MdKeyboardArrowDown style={{transform : openBoxEnvios && "rotate(-180deg)"}}/></button></div>
                            {openBoxEnvios && listadoEnvios &&
                                <div className="sub-info-estimacion-impuestos">
                                    <div className="info-pais">
                                        <span>País</span>
                                        <input type="text" disabled = {true} placeholder="Perú"/>
                                    </div>
                                    <div className="info-estadoCiudad">
                                        <label htmlFor="distritoSelect">Departamento</label>
                                        <select
                                            disabled={isChecked}
                                            id="distritoSelect"
                                            value={selectedDistrito}
                                            onChange={handleChangeDistrito}
                                        >
                                            <option value="">Por favor seleccione un departamento</option>
                                            {listadoEnvios.map((ciudad) => (
                                            <option key={ciudad.id} value={ciudad.name}>
                                                {ciudad.name}
                                            </option>
                                            ))}
                                        </select>
                                        <label htmlFor="departamentoSelect">Provincia</label>
                                        <select
                                            disabled={isChecked || !selectedDistrito}
                                            id="departamentoSelect"
                                            value={selectedDepartamento}
                                            onChange={handleChangeDepartamento}
                                        >
                                            <option value="">Por favor seleccione una provincia</option>
                                            {listaDepartamentos && listaDepartamentos[0].provinces.map((departamento) => (
                                            <option key={departamento.id} value={departamento.id}>
                                                {departamento.name}
                                            </option>
                                            ))}
                                        </select>
                                        <label htmlFor="provinciaSelect">Distrito</label>
                                        <select
                                            disabled={isChecked || !selectedDepartamento || !selectedDistrito}
                                            id="provinciaSelect"
                                            value={selectedProvincia}
                                            onChange={handleChangeProvincia}
                                        >
                                            <option value="">Por favor seleccione un distrito</option>
                                            {listaDistrito && listaDistrito.map((provincia) => (
                                            <option key={provincia.id} id={provincia.id} value={provincia.shipping_cost}>
                                                {provincia.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="info-recojo-en-tienda">
                                        <input type="radio" checked={isChecked} onClick={handleRadioClick} id="recoge-en-tienda"/>
                                        <label htmlFor="recoge-en-tienda">Recojo en tienda</label>
                                    </div>                                
                                </div>}
                                <div className="carrito-info-table">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>S/{subTotal}.00</td>
                                            </tr>
                                            <tr>
                                                <th style={{padding : ".5rem 0"}}>Envío</th>
                                                <td style={{padding : ".5rem 0"}}>S/{isChecked || !selectedProvincia ? "00.00" : selectedProvincia}</td>
                                            </tr>
                                            <tr>
                                                <th className="table-totalPedidotext"><strong>Total del pedido</strong></th>
                                                <td className="table-totalPrecio"><strong>S/{total}.00</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                        <button onClick={handleCreateOrder} disabled={!selectedDistrito || !selectedDepartamento || !selectedProvincia} className={`button-realizarPedido`}>Realizar pedido</button>
                    </div>
                    </>}
            </section>
            <section className="payment_section">
                    <h1>Seleccione método de pago</h1>
                    {listPaymentMethods && 
                     <PaymentMethods data={listPaymentMethods} />}
            </section>
        </div>
    );
}

export default CarritoPage;
