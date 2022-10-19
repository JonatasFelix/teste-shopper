import * as s from './styles';
import { useState } from 'react';
import { putProductQuantityCart } from '../../services/ShoppingCart/putProductQuantityCart';
import { getShoppingCartList } from '../../services/ShoppingCart/getShoppingCartList';
import { deleteProductShoppingCart } from '../../services/ShoppingCart/deleteProductShoppingCart';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

const ButtonLessAndMore = ({
    maxQuantity,
    quantity,
    setOpenBox,
    setShoppingCart,
    productId,
    setLoaderCart,
    setCartError,
    token
}) => {

    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        setLoading(true);
        await putProductQuantityCart(quantity + 1, productId, token)
            .then(() => toast.success("Quantidade alterada com sucesso!"))
            .catch(() => toast.error("Não foi possível alterar a quantidade!"))

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError, token);
        setLoading(false);
    }

    const handleRemove = async () => {
        setLoading(true);
        if (quantity > 1) {
            await putProductQuantityCart(quantity - 1, productId, token)
                .then(() => toast.success("Quantidade alterada com sucesso!"))
                .catch(() => toast.error("Não foi possível alterar a quantidade!"))

        } else {
            await deleteProductShoppingCart(productId, token)
                .then(() => toast.success("Produto removido com sucesso!"))
                .catch(() => toast.error("Não foi possível remover o produto!"))
        }

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError, token)
        setLoading(false);
    }

    const ButtonMore = () => {
        return (
            quantity < maxQuantity
                ? <s.ButtonMore onClick={handleAdd}>+</s.ButtonMore>
                : <s.ButtonMore disabled>+</s.ButtonMore>
        )
    }

    const ButtonLess = () => {
        return (
            <s.ButtonLess onClick={handleRemove}>-</s.ButtonLess>
        )
    }

    const ButtonQuantity = () => {
        return (
            <s.ButtonQuantity onClick={() => setOpenBox(true)}>{quantity}</s.ButtonQuantity>
        )
    }

    return (
        <s.Container>
            {loading && <s.LoaderContainer><Loader width={"30px"} height={"30px"} /></s.LoaderContainer>}
            <ButtonLess />
            <ButtonQuantity title={`Tem apenas ${maxQuantity} unidades em estoque`} />
            <ButtonMore />
        </s.Container>
    )
};

export default ButtonLessAndMore;