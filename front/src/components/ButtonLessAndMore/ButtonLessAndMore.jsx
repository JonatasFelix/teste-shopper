import * as s from './styles';
import { useState } from 'react';
import { putProductQuantityCart } from '../../services/putProductQuantityCart';
import { getShoppingCartList } from '../../services/getShoppingCartList';
import { deleteProductShoppingCart } from '../../services/deleteProductShoppingCart';
import Loader from '../Loader/Loader';


const ButtonLessAndMore = ({
    maxQuantity, 
    quantity, 
    setOpenBox, 
    setShoppingCart, 
    productId, 
    setLoaderCart, 
    setCartError, 
}) => {

    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        setLoading(true);
        await putProductQuantityCart(quantity + 1, productId)
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);
        setLoading(false);
    }

    const handleRemove = async() => {
        setLoading(true);
        if (quantity > 1) {
            await putProductQuantityCart(quantity - 1, productId)
        } else {
            await deleteProductShoppingCart(productId)
        }

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError)
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
            {loading && <s.LoaderContainer><Loader width={"30px"} height={"30px"}/></s.LoaderContainer>}
            <ButtonLess />
            <ButtonQuantity />
            <ButtonMore />
        </s.Container>
    )


};

export default ButtonLessAndMore;