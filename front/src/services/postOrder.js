import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const postOrder = async (body) => {
   await axios.post(`${BASE_URL}/orders`, body).catch((err) => {throw new Error(err.response.data.error)})
};