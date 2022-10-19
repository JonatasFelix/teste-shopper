import * as s from "./styles";
import { postOrder } from "../../services/Orders/postOrder";
import { getShoppingCartList } from "../../services/ShoppingCart/getShoppingCartList";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { deleteAllProductsShoppingCart } from "../../services/ShoppingCart/deleteAllProductsShoppingCart";

const ButtonFinishBuy = ({ date, setters, states, setError }) => {

    const [loading, setLoading] = useState(false);
    const { shoppingCart, token } = states;
    const { setShoppingCart, setLoaderCart, setCartError } = setters;
    const appointmentDate = date;

    const handleClick = async () => {

        if (!appointmentDate) {
            setError(true);
            return
        }

        const listForOrder = shoppingCart.list.map((item) => {
            return {
                id: item.productId,
                quantity: item.quantity
            }
        })

        const body = {
            products: listForOrder,
            appointmentDate: appointmentDate
        }

        setLoading(true);
        await postOrder(body, token)
            .then(async () => {
                await deleteAllProductsShoppingCart(token)
                toast.success("Compra realizada com sucesso")
            })
            .catch((err) => toast.error(`${err.message}`))

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError, token)
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