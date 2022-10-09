import axios from "axios";
import { BASE_URL } from "../constants/BASE_URL";

export const getProductsList = async (
    setError,
    setLoading,
    setProductsList,
    setTotalItens,
    page,
    quantity,
    order,
    sort,
    search
) => {


    setLoading(true);

    await axios.get(`${BASE_URL}/products?search=${search}&page=${page}&limit=${quantity}&order=${order}&sort=${sort}`)
        .then((res) => {
            setProductsList(res.data);
            setTotalItens(res.data.total);
            setError(false);
        })
        .catch((err) => {
            setError(err);
            setProductsList([]);
        })

    setLoading(false);

};