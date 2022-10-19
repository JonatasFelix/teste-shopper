import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const getAllOrders = async (token, setOrders, setLoader, setError) => {
    setLoader(true)
    setError(false)

    axios.get(`${BASE_URL}/orders/all`, {
        headers: {
            Authorization: token
        }
    }).then((response) => {
        setOrders(response.data)
        setLoader(false)
    }).catch((error) => {
        setError(error.response.data.error)
        setLoader(false)
    })
}