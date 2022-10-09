import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const deleteAllProductsShoppingCart = async () => {
    await axios.delete(`${BASE_URL}/shoppingCart/all`)
};