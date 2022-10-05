import { useState } from "react";
import * as s from "./styles";

const ModalQuantity = ({ setClose, quantity, maxQuantity, open, }) => {
    const [quantityValue, setQuantityValue] = useState(quantity);
    
    const handleClose = () => {
        setClose(false)
    }

    const handleAdd = () => {
        // onAdd(quantityValue);
        handleClose();
    };
    
    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        const quantity = value > maxQuantity ? maxQuantity : value;
        setQuantityValue(quantity);
    };
    
    return (
        <s.Modal open={open}>
            <s.ModalContent>
                <h2>Quantidade</h2>
                <input
                type="number"
                value={quantity}
                max={maxQuantity}
                onChange={handleQuantityChange}
                />
                <button onClick={handleAdd}>Adicionar</button>
            </s.ModalContent>
        </s.Modal>
    );
};

export default ModalQuantity;