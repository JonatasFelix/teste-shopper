import * as s from "./styles";
import { useState, useEffect } from "react"; 
import { putProductQuantityCart } from "../../services/ShoppingCart/putProductQuantityCart";
import { getShoppingCartList } from "../../services/ShoppingCart/getShoppingCartList";
import Loader from "../Loader/Loader";
import { deleteProductShoppingCart } from "../../services/ShoppingCart/deleteProductShoppingCart";
import { toast } from 'react-toastify';

const ModalQuantiyCartProduct = ({
    setClose,
    quantity,
    maxQuantity,
    open,
    productId,
    states,
    setters
}) => {

    const { setLoaderCart, setShoppingCart, setCartError } = setters;
    const { token } = states;
    const [quantityValue, setQuantityValue] = useState(quantity);   
    const [loading, setLoading] = useState(false);                  

    useEffect(() => {
        setQuantityValue(quantity);
    }, [quantity]);

    
    const handleClose = () => {
        setClose(false)
    }
    
    const handleAdd = async (e) => {
        e.preventDefault();
        
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
        open && (
            <s.Container onSubmit={handleAdd}>
                <s.Input
                    type="number"
                    value={quantityValue}
                    onChange={handleQuantityChange}
                    min={0}
                    title={`Quantidade disponível: ${maxQuantity}`}
                />
                {loading
                    ? <s.Button disabled><Loader width={"20px"} height={"20px"} /></s.Button>
                    : <s.Button>Atualizar</s.Button>
                }
            </s.Container>
        )
    )
};

export default ModalQuantiyCartProduct;