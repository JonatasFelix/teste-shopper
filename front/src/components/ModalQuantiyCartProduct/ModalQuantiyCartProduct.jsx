import * as s from "./styles";
import { useState, useEffect } from "react"; import { putProductQuantityCart } from "../../services/putProductQuantityCart";
import { getShoppingCartList } from "../../services/getShoppingCartList";
import Loader from "../Loader/Loader";
import { deleteProductShoppingCart } from "../../services/deleteProductShoppingCart";
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
    const handleAdd = async (e) => {
        e.preventDefault();

        // CASO A QUANTIDADE FOR INVAILDA VOLTA A QUANTITY ATUAL
        if (isNaN(quantityValue) || quantityValue < 0) {
            setQuantityValue(quantity);
        }

        // CASO DIGITADO 0 REMOVE O PRODUTO DO CARRINHO
        if (quantityValue === 0) {
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

    const handleQuantityChange = (event) => {
        let value = parseInt(event.target.value);
        value = value > maxQuantity ? maxQuantity : value;   // CASO O VALOR DIGITADO SEJA MAIOR QUE A QUANTIDADE MÁXIMA, O VALOR SERÁ A QUANTIDADE MÁXIMA
        setQuantityValue(value);                             // ALTERANDO O ESTADO DO INPUT DE QUANTIDADE
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
}

export default ModalQuantiyCartProduct;