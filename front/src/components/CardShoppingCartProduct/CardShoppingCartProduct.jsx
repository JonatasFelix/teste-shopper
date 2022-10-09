import * as s from "./styles"
import { useState } from "react";
import ButtonLessAndMore from "../ButtonLessAndMore/ButtonLessAndMore";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import { deleteProductShoppingCart } from "../../services/deleteProductShoppingCart";
import { BsTrash } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import ModalQuantity from "../ModalQuantity/ModalQuantity";
import ButtonUnavailable from "../ButtonUnavailable/ButtonUnavailable";

const CardShoppingCartProduct = ({ product, states, setters }) => {
    const { shoppingCart, loaderCart } = states;
    const { setShoppingCart, setLoaderCart, setCartError } = setters;
    const [openBox, setOpenBox] = useState(false);

    const name = product.name;
    const price = product.price.toFixed(2).toString().replace(".", ",");
    const total = (product.price * product.quantity).toFixed(2).toString().replace(".", ",");
    const quantity = product.quantity;


    const buttonRemoveHandler = async () => {
        await deleteProductShoppingCart(product.productId)
            .then(() => toast.success("Produto removido com sucesso"))
            .catch(() => toast.error("Erro ao remover produto"))
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError)
    };


    const ShowButtonLessAndMore = () => {
        return (<>
            <ButtonLessAndMore
                maxQuantity={product.quantityStock}
                quantity={quantity}
                setQuantity={setShoppingCart}
                setOpenBox={setOpenBox}
                setShoppingCart={setShoppingCart}
                productId={product.productId}
                setLoaderCart={setLoaderCart}
                setCartError={setCartError}
                shoppingCart={shoppingCart}
            />

            {product.quantityStock < quantity &&
                <s.QuantityUnavailableMsg
                    title={`Quantidade escolhida indisponível. 
                        Quantidade disponível: ${product.quantityStock}`
                    }
                >
                    Quantidade indisponível
                </s.QuantityUnavailableMsg>
            }
        </>
        )
    }


    return (
        <s.Container>
            <s.Td>{name}</s.Td>
            <s.Td>R$: {price}</s.Td>
            <s.Td style={{ position: "relative" }}>
            {product.quantityStock ? <ShowButtonLessAndMore /> : <ButtonUnavailable /> }
            </s.Td>
            <s.Td>R$: {total}</s.Td>
            <s.Td
                title="Remover"
                style={{ textAlign: "center", position: "relative" }}
            >
                {loaderCart &&
                    <s.LoaderContainer>
                        <Loader width={"24px"} height={"24px"} />
                    </s.LoaderContainer>
                }

                <BsTrash color={"#FF1515"} size={"24px"} onClick={buttonRemoveHandler} cursor={"pointer"} />
            </s.Td>
        </s.Container>
    )


}

export default CardShoppingCartProduct;