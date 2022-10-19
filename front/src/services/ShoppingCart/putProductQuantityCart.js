import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const putProductQuantityCart = async (quantity, productId, token) => {
   await axios.put(`${BASE_URL}/shoppingCart/${productId}`, {quantity}, {
         headers: {
            Authorization: String(token)
            }
   })
    .then((response) => {
    })
    .catch((error) => {
    })
}