import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const getOrderDetails = async (id, token, setLoader, setError, setOrder) => {
    setLoader(true);
    setError(false);
    await axios.get(`${BASE_URL}/orders/details/${id}`, {
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            setOrder(res.data);
        })
        .catch(err => {
            setError(true);
        })

    setLoader(false);
}