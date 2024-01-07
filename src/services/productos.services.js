import axios from "axios"
import { URL_API } from "../config/Api.js"

export const getProduct = async(id) =>{
    const result = await axios.get(`${URL_API}products/${id}`);
    return result;
}
