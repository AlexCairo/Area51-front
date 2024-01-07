import axios from "axios"
import { URL_API } from "../config/Api.js"

export const listarCostosEnvio = async () => {
    const res = await axios.get(`${URL_API}locations`);
    return res;
}