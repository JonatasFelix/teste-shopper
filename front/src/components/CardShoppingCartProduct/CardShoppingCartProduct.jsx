import * as s from "./styles"
import { useState } from "react";
import ButtonLessAndMore from "../ButtonLessAndMore/ButtonLessAndMore";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import { deleteProductShoppingCart } from "../../services/deleteProductShoppingCart";
import { BsTrash } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import ButtonUnavailable from "../ButtonUnavailable/ButtonUnavailable";
import ModalQuantiyCartProduct from "../ModalQuantiyCartProduct/ModalQuantiyCartProduct";

// CARD SHOPPING CART PRODUCT - RENDERIZA OS PRODUTOS DO CARRINHO DE COMPRAS DISPONÍVEIS E INDISPONÍVEIS
// RECEBE COMO PROPRIEDADES O PRODUTO, OS ESTADOS E OS SETTERS


const CardShoppingCartProduct = ({ product, states, setters }) => {
    const { shoppingCart, loaderCart } = states;                        // STATES DO CONTEXTO GLOBAL
    const { setShoppingCart, setLoaderCart, setCartError } = setters;   // SETTERS DO CONTEXTO GLOBAL
    const [openBox, setOpenBox] = useState(false);                      // ESTADO QUE CONTROLA A ABERTURA DO MODAL DE QUANTIDADE

    const name = product.name;                                                                  // NOME DO PRODUTO
    const price = product.price.toFixed(2).toString().replace(".", ",");                        // PREÇO DO PRODUTO FORMATADO
    const total = (product.price * product.quantity).toFixed(2).toString().replace(".", ",");   // TOTAL DO PRODUTO FORMATADO
    const quantity = product.quantity;                                                          // QUANTIDADE DO PRODUTO


    // FUNÇÃO QUE REMOVE O PRODUTO DO CARRINHO DE COMPRAS
    const buttonRemoveHandler = async () => {
        await deleteProductShoppingCart(product.productId)
            .then(() => toast.success("Produto removido com sucesso"))
            .catch(() => toast.error("Erro ao remover produto"))
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError)
    };


    // FUNÇÃO QUE RENDERIZA A OPÇÃO DE ALTERAR A QUANTIDADE DO PRODUTO
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

            {product.quantityStock < quantity &&   // CASO A QUANTIDADE DO PRODUTO SEJA MAIOR QUE A QUANTIDADE EM ESTOQUE, RENDERIZA UMA MESAGEM
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
            <ModalQuantiyCartProduct 
                states={states}
                setters={setters}
                setClose={setOpenBox}
                productId={product.productId}
                open={openBox}
                maxQuantity={product.quantityStock}
                quantity={quantity}
            />
            </s.Td>
            <s.Td id="mobile">R$: {total}</s.Td>
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