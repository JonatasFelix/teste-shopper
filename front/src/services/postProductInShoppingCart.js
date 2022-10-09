import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const postProductInShoppingCart = async (productId) => {
    await axios.post(`${BASE_URL}/shoppingCart/${productId}`)
        .then((response) => {
        })
        .catch((err) => {
            throw new Error(err.response.data.error)
        });
}
