import { useState, useEffect } from "react";
import * as s from "./styles";
import { IoClose } from "react-icons/io5";
import { putProductQuantityCart } from "../../services/putProductQuantityCart";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import Loader from "../Loader/Loader";
import { deleteProductShoppingCart } from "../../services/deleteProductShoppingCart";

const ModalQuantity = ({
    setClose,
    quantity,
    maxQuantity,
    open,
    setLoaderCart,
    setShoppingCart,
    setCartError,
    productId,
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

        if(quantityValue === 0){
            await deleteProductShoppingCart(productId);
        }

        if (quantity !== quantityValue && quantityValue <= maxQuantity) {
            setLoading(true);
            await putProductQuantityCart(quantityValue, productId)
            await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
        }
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
            {loading && <s.LoaderContainer><Loader width={"36px"} height={"36px"}/></s.LoaderContainer>}
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