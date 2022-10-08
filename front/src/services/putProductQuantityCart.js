import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const putProductQuantityCart = async (quantity, productId) => {
   await axios.put(`${BASE_URL}/shoppingCart/${productId}`, {quantity})
    .then((response) => {
    })
    .catch((error) => {
    })
}