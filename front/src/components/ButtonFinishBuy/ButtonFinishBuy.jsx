import * as s from "./styles";
import { postOrder } from "../../services/postOrder";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { deleteAllProductsShoppingCart } from "../../services/deleteAllProductsShoppingCart";

// ButtonFinishBuy Recebe:
// DATE: DATA DE AGENDAMENTO
// SETTERS: SETTERS DO CONTEXTO GLOBAL
// STATES: STATES DO CONTEXTO GLOBAL
// SETERROR: SETA O ERRO DE DATA DE AGENDAMENTO

const ButtonFinishBuy = ({ date, setters, states, setError }) => {

    const [loading, setLoading] = useState(false);                      // LOADING DO BOTÃO
    const { shoppingCart, name } = states;                              // STATES DO CONTEXTO GLOBAL
    const { setShoppingCart, setLoaderCart, setCartError } = setters;   // SETTERS DO CONTEXTO GLOBAL
    const appointmentDate = date;                                       // DATA DE AGENDAMENTO

    // FUNÇÃO QUE FAZ A REQUISIÇÃO DE POST DE PEDIDO
    const handleClick = async () => {

        // SE A DATA DE AGENDAMENTO NÃO FOR DEFINIDA - SETA O ERRO
        if (!appointmentDate) {
            setError(true);
            return
        }

        // CASO NÃO TENHA NOME SALVO NO CONTEXTO GLOBAL - ATUALIZA A APLICAÇÃO
        if (!name) {
            toast.error("Por favor, digite seu nome");
            window.location.reload()
            return
        }

        // CRIA UMA LISTA DE PRODUTOS COM O ID E QUANTIDADE - REQUISIÇÃO DE POST DE PEDIDO
        const listForOrder = shoppingCart.list.map((item) => {
            return {
                id: item.productId,
                quantity: item.quantity
            }
        })

        // CRIA UM OBJETO COM OS DADOS DO PEDIDO
        const body = {
            userName: name,                     // NOME DO USUÁRIO
            products: listForOrder,             // LISTA DE PRODUTOS
            appointmentDate: appointmentDate    // DATA DE AGENDAMENTO
        }

        // REQUISIÇÃO DE POST DE PEDIDO
        setLoading(true);                // SETA O LOADING DO BOTÃO
        await postOrder(body)           // REQUISIÇÃO DE POST DE PEDIDO
            .then(async () => {         // SE A REQUISIÇÃO FOR BEM SUCEDIDA
                await deleteAllProductsShoppingCart()   // REQUISIÇÃO DE LIMPAR O CARRINHO
                toast.success("Compra realizada com sucesso")   // TOAST DE SUCESSO
            })
            .catch((err) => toast.error(`${err.message}`))   // TOAST DE ERRO SE A REQUISIÇÃO NÃO FOR BEM SUCEDIDA

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError)  // REQUISIÇÃO DE LISTAR O CARRINHO
        setError(false)     // SETA O ERRO DE DATA DE AGENDAMENTO COMO FALSE
        setLoading(false);  // SETA O LOADING DO BOTÃO COMO FALSE
    };



    return (
        <>
            {loading    // SE O LOADING FOR TRUE - RENDERIZA O BOTÃO COM LOADING
                ? <s.ButtonFinishBuyLoading> <Loader width={"20px"} height={"20px"} /> </s.ButtonFinishBuyLoading>
                : shoppingCart.list?.length     // CONDIÇÃO QUE VERIFICA SE A LISTA DE PRODUTOS DO CARRINHO ESTÁ VAZIA
                    ? <s.ButtonFinishBuy onClick={handleClick}>Finalizar compra</s.ButtonFinishBuy>
                    : <s.ButtonFinishBuy disabled>Finalizar compra</s.ButtonFinishBuy>
            }
        </>
    );
}


export default ButtonFinishBuy;