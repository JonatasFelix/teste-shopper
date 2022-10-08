import * as s from "./styles";
import { useState } from "react";
import { postProductInShoppingCart } from "../../services/postProductInShoppingCart";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const ButtonAdd = ({ productId, setShoppingCart, setLoaderCart, setCartError }) => {

    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await postProductInShoppingCart(productId)
            .then(() => toast.success("Produto adicionado com sucesso!"))
            .catch(() => toast.error("Não foi possível adicionar o produto!"))
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
        setLoading(false);
    }

    return (
        loading
            ? <s.ButtonProductAdd disabled><Loader width={"20px"} height={"20px"}/></s.ButtonProductAdd>
            : <s.ButtonProductAdd onClick={handleClick}>Adicionar</s.ButtonProductAdd>
    );
};

export default ButtonAdd;