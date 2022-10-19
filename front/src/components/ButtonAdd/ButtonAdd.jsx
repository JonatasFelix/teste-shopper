import * as s from "./styles";
import { useState } from "react";
import { postProductInShoppingCart } from "../../services/ShoppingCart/postProductInShoppingCart";
import { getShoppingCartList } from "../../services/ShoppingCart/getShoppingCartList";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const ButtonAdd = ({ productId, setShoppingCart, setLoaderCart, setCartError, token }) => {

    const [loading, setLoading] = useState(false); 

    const handleClick = async () => {
        setLoading(true);
        await postProductInShoppingCart(productId, token)                              
            .then(() => toast.success("Produto adicionado com sucesso!"))       
            .catch((err) => toast.error(`${err.message}`))  
            
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError, token); 
        setLoading(false);
    }

    return (
        loading
            ? <s.ButtonProductAdd disabled><Loader width={"20px"} height={"20px"}/></s.ButtonProductAdd>
            : <s.ButtonProductAdd onClick={handleClick}>Adicionar</s.ButtonProductAdd>
    );
};

export default ButtonAdd;