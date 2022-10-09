import * as s from "./styles";
import { postOrder } from "../../services/postOrder";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { deleteAllProductsShoppingCart } from "../../services/deleteAllProductsShoppingCart";

const ButtonFinishBuy = ({ body, setters, states, setError }) => {

    const [loading, setLoading] = useState(false);
    const { shoppingCart, name } = states;
    const { setShoppingCart, setLoaderCart, setCartError } = setters;
    const { appointmentDate } = body;


    const handleClick = async () => {
        console.log(appointmentDate);
        if (!appointmentDate) {
            setError(true);
            return
        }

        if (!name) {
            toast.error("Por favor, digite seu nome");
            window.location.reload()
            return
        }

        const listForOrder = shoppingCart.list.map((item) => {
            return {
                id: item.productId,
                quantity: item.quantity
            }
        })

        const body = {
            userName: name,
            products: listForOrder,
            appointmentDate: appointmentDate
        }

        setLoading(true);
        await postOrder(body)
            .then(async () => {
                await deleteAllProductsShoppingCart()
                toast.success("Compra realizada com sucesso")
            })
            .catch(() => toast.error("Erro ao realizar pedido!"))
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError)
        setError(false)
        setLoading(false);
    };



    return (
        <>
            {loading
                ? <s.ButtonFinishBuyLoading> <Loader width={"20px"} height={"20px"} /> </s.ButtonFinishBuyLoading>
                : shoppingCart.list?.length
                    ? <s.ButtonFinishBuy onClick={handleClick}>Finalizar compra</s.ButtonFinishBuy>
                    : <s.ButtonFinishBuy disabled>Finalizar compra</s.ButtonFinishBuy>
            }
        </>
    );
}


export default ButtonFinishBuy;