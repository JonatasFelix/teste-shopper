import { useState, useEffect } from "react";
import * as s from "./styles";
import { IoClose } from "react-icons/io5";
import { putProductQuantityCart } from "../../services/putProductQuantityCart";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import Loader from "../Loader/Loader";
import { deleteProductShoppingCart } from "../../services/deleteProductShoppingCart";
import { toast } from 'react-toastify';

// MODAL QUANTITY RESPONSALVEL POR ALTERAR A QUANTIDADE DE UM PRODUTO NO CARRINHO
// RECEBE:
// setClose: FUNÇÃO QUE FECHA O MODAL
// quantity: QUANTIDADE ATUAL DO PRODUTO
// maxQuantity: QUANTIDADE MÁXIMA DO PRODUTO
// open: BOOLEANO QUE ABRE OU FECHA O MODAL
// setLoaderCart: FUNÇÃO QUE ALTERA O ESTADO DO LOADER DO CARRINHO
// setShoppingCart: FUNÇÃO QUE ALTERA O ESTADO DO CARRINHO
// setCartError: FUNÇÃO QUE ALTERA O ESTADO DO ERRO DO CARRINHO
// productId: ID DO PRODUTO

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

    const [quantityValue, setQuantityValue] = useState(quantity);   // ESTADO DO INPUT DE QUANTIDADE
    const [loading, setLoading] = useState(false);                  // ESTADO DO LOADER

    //ATUALIZANDO A QUANTIDADE DO PRODUTO NO CARRINHO
    useEffect(() => {
        setQuantityValue(quantity);
    }, [quantity]);

    // FUNÇÃO PARA FECHAR O MODAL
    const handleClose = () => {
        setClose(false)
    }

    // FUNÇÃO PARA ENVIAR A REQUISIÇÃO DE ALTERAR A QUANTIDADE DO PRODUTO NO CARRINHO
    const handleAdd = async () => {
        // CASO A QUANTIDADE FOR INVAILDA VOLTA A QUANTITY ATUAL
        if (isNaN(quantityValue) || quantityValue < 0) {
            setQuantityValue(quantity);
        }

        // CASO DIGITADO 0 REMOVE O PRODUTO DO CARRINHO
        if(quantityValue === 0){
            await deleteProductShoppingCart(productId)
                .then(() => toast.success("Produto removido com sucesso!"))
                .catch(() => toast.error("Não foi possível remover o produto!"))
        }

        // CASO A QUANTIDADE DO INPUT FOR DIFFERENTE DA QUANTIDADE ATUAL
        // CASO FOR MENOR OU IGUAL A QUANTIDADE MÁXIMA
        // CASO FOR MAIOR QUE 0
        // EFETUA A REQUISIÇÃO DE ALTERAR A QUANTIDADE DO PRODUTO NO CARRINHO
        if (quantity !== quantityValue && quantityValue <= maxQuantity && quantityValue !== 0) {
            setLoading(true);
            await putProductQuantityCart(quantityValue, productId)
                .then(() => toast.success("Quantidade alterada com sucesso!"))
                .catch(() => toast.error("Não foi possível alterar a quantidade!"))

            await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
        }

        setLoading(false);  // DESATIVA O LOADER
        handleClose();      // FECHA O MODAL
    };

    // FUNÇÃO PARA ALTERAR O ESTADO DO INPUT DE QUANTIDADE
    const handleQuantityChange = (event) => {
        let value = parseInt(event.target.value);
        value = value > maxQuantity ? maxQuantity : value;   // CASO O VALOR DIGITADO SEJA MAIOR QUE A QUANTIDADE MÁXIMA, O VALOR SERÁ A QUANTIDADE MÁXIMA
        setQuantityValue(value);                             // ALTERANDO O ESTADO DO INPUT DE QUANTIDADE
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