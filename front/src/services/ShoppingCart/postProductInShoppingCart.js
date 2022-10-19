import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const postProductInShoppingCart = async (productId, token) => {
    await axios.post(`${BASE_URL}/shoppingCart/${productId}`, {}, {
        headers: {
            Authorization: String(token)
        }
    }).then((res) => {
    }).catch((err) => {
        throw new Error(err.response.data.error);
    })
}