import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const postNewAccount = async (setLoader, setToken, setError, input) => {

    setLoader(true);
    setError(false);

    await axios.post(`${BASE_URL}/users/signup`, input)
        .then((res) => {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setError("");
        })
        .catch((err) => {
            setError(err.response.data.error);

        })

        setLoader(false);
};