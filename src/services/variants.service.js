import axios from "axios"
import { URL_API } from "../config/Api.js"

export const getVariant = async(id) =>{
    const result = await axios.get(`${URL_API}variants/${id}`);
    return result;
}
