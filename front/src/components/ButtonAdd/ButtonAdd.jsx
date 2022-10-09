import * as s from "./styles";
import { useState } from "react";
import { postProductInShoppingCart } from "../../services/postProductInShoppingCart";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

// BUTTON ADD - RECEBE:
// productId: ID DO PRODUTO
// setShoppingCart: FUNÇÃO QUE ATUALIZA O ESTADO DO CARRINHO -- GLOBAL CONTEXT --
// setLoaderCart: FUNÇÃO QUE ATUALIZA O ESTADO DO LOADER DO CARRINHO -- GLOBAL CONTEXT --
// setCartError: FUNÇÃO QUE ATUALIZA O ESTADO DO ERRO DO CARRINHO -- GLOBAL CONTEXT --

const ButtonAdd = ({ productId, setShoppingCart, setLoaderCart, setCartError }) => {

    const [loading, setLoading] = useState(false); // LOADING

    // FUNÇÃO QUE ADICIONA O PRODUTO NO CARRINHO
    const handleClick = async () => {
        setLoading(true);
        await postProductInShoppingCart(productId)                              // FAZ A REQUISIÇÃO PARA ADICIONAR O PRODUTO NO CARRINHO
            .then(() => toast.success("Produto adicionado com sucesso!"))       // SE A REQUISIÇÃO FOR BEM SUCEDIDA, MOSTRA UMA MENSAGEM DE SUCESSO
            .catch((err) => toast.error(`${err.message}`))  // SE A REQUISIÇÃO NÃO FOR BEM SUCEDIDA, MOSTRA UMA MENSAGEM DE ERRO
            
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError); // FAZ A REQUISIÇÃO PARA ATUALIZAR O CARRINHO NA TELA
        setLoading(false);
    }

    // CONDICIONAL PARA MOSTRAR O LOADER OU O BOTÃO
    return (
        loading
            ? <s.ButtonProductAdd disabled><Loader width={"20px"} height={"20px"}/></s.ButtonProductAdd>
            : <s.ButtonProductAdd onClick={handleClick}>Adicionar</s.ButtonProductAdd>
    );
};

export default ButtonAdd;