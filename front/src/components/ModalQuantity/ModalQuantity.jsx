import { useState, useEffect } from "react";
import * as s from "./styles";
import { IoClose } from "react-icons/io5";
import { putProductQuantityCart } from "../../services/ShoppingCart/putProductQuantityCart";
import { getShoppingCartList } from "../../services/ShoppingCart/getShoppingCartList";
import Loader from "../Loader/Loader";
import { deleteProductShoppingCart } from "../../services/ShoppingCart/deleteProductShoppingCart";
import { toast } from 'react-toastify';

const ModalQuantity = ({
    setClose,
    quantity,
    maxQuantity,
    open,
    setLoaderCart,
    setShoppingCart,
    setCartError,
    productId,
    token
}) => {

    const [quantityValue, setQuantityValue] = useState(quantity);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setQuantityValue(quantity);
    }, [quantity]);


    const handleClose = () => {
        setClose(false)
    }

    const handleAdd = async () => {

        if (isNaN(quantityValue) || quantityValue < 0) {
            setQuantityValue(quantity);
        }

        if (quantityValue === 0) {
            await deleteProductShoppingCart(productId, token)
                .then(() => toast.success("Produto removido com sucesso!"))
                .catch(() => toast.error("Não foi possível remover o produto!"))
        }

        if (quantity !== quantityValue && quantityValue <= maxQuantity && quantityValue !== 0) {
            setLoading(true);
            await putProductQuantityCart(quantityValue, productId, token)
                .then(() => toast.success("Quantidade alterada com sucesso!"))
                .catch(() => toast.error("Não foi possível alterar a quantidade!"))
        }

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError, token);

        setLoading(false);
        handleClose();
    };

    const handleQuantityChange = (event) => {
        let value = parseInt(event.target.value);
        value = value > maxQuantity ? maxQuantity : value;
        setQuantityValue(value);
    };

    return (
        <s.Modal open={open}>
            {loading && <s.LoaderContainer><Loader width={"36px"} height={"36px"} /></s.LoaderContainer>}
            <s.ModalContent>
                <h2>Quantidade</h2>
                <s.Input
                    title={`Você pode adicionar até ${maxQuantity} unidades`}
                    type="number"
                    value={quantityValue}
                    min="0"
                    max={maxQuantity}
                    onChange={handleQuantityChange}
                />
                <s.ButtonUpdate onClick={handleAdd}>Atualizar</s.ButtonUpdate>

                <s.CloseButton onClick={handleClose} >
                    <IoClose color="#FF0000" size="26px" />
                </s.CloseButton>

            </s.ModalContent>
        </s.Modal>
    );
};

export default ModalQuantity;