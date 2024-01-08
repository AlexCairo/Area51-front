import axios from "axios"
import { URL_API } from "../config/Api.js"

export const createOrder = async(order) =>{
    const result = await axios.post(`${URL_API}orders`,order);
    return result;
}

export const createShipment = async(orderId, shippinMehod, districtId) => {
    const res = await axios.post(`${URL_API}shippings?order_id=${orderId}&shipping_method_id=${shippinMehod}&district_id=${districtId}`);
    return res;
}

export const paymenMethods = async() => {
    const res = await axios.get(`${URL_API}payment_methods`);
    return res;
}