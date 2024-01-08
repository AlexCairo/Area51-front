import axios from "axios"
import { URL_API } from "../config/Api.js"

export const createOrder = async(order) =>{
    const result = await axios.post(`${URL_API}orders`,order);
    return result;
}

export const createShipment = async(orderId, shippinMehod, districtId) => {
    
    if(districtId){
        const res = await axios.post(`${URL_API}shippings?order_id=${orderId}&shipping_method_id=${shippinMehod}&district_id=${districtId}`);
        return res;
    } else {
        const res = await axios.post(`${URL_API}shippings?order_id=${orderId}&shipping_method_id=${shippinMehod}`);
        return res;
    }
}

export const paymenMethods = async() => {
    const res = await axios.get(`${URL_API}payment_methods`);
    return res;
}

const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

export const payment = async(paymentId,orderId,img) => {
    const formData = new FormData();
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;

    formData.append('payment_id',paymentId);
    formData.append('order_id',orderId);
    formData.append('boucher',img)
    formData.append('date',fechaFormateada);

    const res = await axios.post(`${URL_API}payments`,formData, config);
    return res;
}