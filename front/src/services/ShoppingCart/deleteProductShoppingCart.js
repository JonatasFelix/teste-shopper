import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const deleteProductShoppingCart = async (productId, token) => {
   await axios.delete(`${BASE_URL}/shoppingCart/${productId}`, {
      headers: {
         Authorization: token
      }
   })
}