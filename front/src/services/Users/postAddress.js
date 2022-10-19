import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const postAddress = async (body, token, setToken, setLoader) => {
    setLoader(true);
    await axios.post(`${BASE_URL}/users/address`, body, {
        headers: {
            Authorization: token
        }
    })
    .then((res) => { 
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token)
     })
    .catch((err) => { throw new Error(err.response.data.error) })


    setLoader(false);
};