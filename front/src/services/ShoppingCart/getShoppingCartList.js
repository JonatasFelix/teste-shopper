import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const getShoppingCartList = async (setLoaderCard, setShoppingCart, setCartError, token) => {
    setLoaderCard(true);
    setCartError(false);
    await axios.get(`${BASE_URL}/shoppingCart`, {
        headers: {
            Authorization: token
        }
    })
        .then((res) => {
            setShoppingCart(res.data);
        })
        .catch((err) => {
            setCartError(true);
        })

    setLoaderCard(false);
};