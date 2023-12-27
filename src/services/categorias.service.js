import axios from "axios"
import { URL_API } from "../config/Api.js"

export const listarCategorias = async () => {
    const result = await axios.get(`${URL_API}store`);
    return result;
}

export const listarSubCategorias = async (id) => {
    const result = await axios.get(`${URL_API}store/subcategory/${id}`);
    return result;
}
