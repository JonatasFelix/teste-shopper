import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import * as s from "./styles"
import ButtonLessAndMore from "../ButtonLessAndMore/ButtonLessAndMore";
import ModalQuantity from "../ModalQuantity/ModalQuantity";

const CardProduct = (product) => {
    const { states, setters } = useContext(GlobalContext);
    const { shoppingCart } = states;
    const { setShoppingCart } = setters;

    const [openBox, setOpenBox] = useState(false);
    const itemInCartQuantity = shoppingCart.find((item) => item.id === product.id)?.quantity || 0;

    const [quantity, setQuantity] = useState(itemInCartQuantity);


    const ShowButton = () => {
        if(!product.quantity){
            return <s.ButtonProductUnavailable>Indisponível</s.ButtonProductUnavailable>
        } else if (itemInCartQuantity) {
            return <ButtonLessAndMore 
                    maxQuantity={product.quantity} 
                    quantity={itemInCartQuantity} 
                    setQuantity={setShoppingCart}
                    setOpenBox={setOpenBox}        
                    />
        } else {
            return <s.ButtonProductAdd>Adicionar</s.ButtonProductAdd>
        }
    }


    return (
        <s.Container>
            <ModalQuantity 
                setClose={setOpenBox} 
                open={openBox}
                maxQuantity={product.quantity}
                quantity={quantity}
                setQuantityValue={setQuantity}
            />
            <s.Title>{product.title}</s.Title>
            <div>
                <s.LocalCurrency>R$: </s.LocalCurrency>
                <s.ProductPrice>{product.price},00</s.ProductPrice>
            </div>
            <s.ProductQuantity>Quantidade: {product.quantity} unds</s.ProductQuantity>
            <ShowButton />

        </s.Container>
    );

};


export default CardProduct;