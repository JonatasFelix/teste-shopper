import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import * as s from "./styles"
import ButtonLessAndMore from "../ButtonLessAndMore/ButtonLessAndMore";
import ModalQuantity from "../ModalQuantity/ModalQuantity";
import ButtonUnavailable from "../ButtonUnavailable/ButtonUnavailable";
import ButtonAdd from "../ButtonAdd/ButtonAdd";

const CardProduct = (product) => {
    const { states, setters } = useContext(GlobalContext);
    const { shoppingCart } = states;
    const { setShoppingCart, setLoaderCart, setCartError } = setters;
    const [itemInCartQuantity, setItemInCartQuantity] = useState(0);

    const [openBox, setOpenBox] = useState(false);
    
    useEffect(() => {
        setItemInCartQuantity(shoppingCart.list?.find((item) => item.productId === product.productId)?.quantity || 0)
    }, [shoppingCart, product.productId]);


    const ShowButton = () => {
        if(!product.quantityStock){
            return <ButtonUnavailable/>
        } else if (itemInCartQuantity) {
            return <ButtonLessAndMore 
                    maxQuantity={product.quantityStock} 
                    quantity={itemInCartQuantity} 
                    setQuantity={setShoppingCart}
                    setOpenBox={setOpenBox}
                    
                    setShoppingCart={setShoppingCart} 
                    productId={product.productId}
                    setLoaderCart={setLoaderCart}
                    setCartError={setCartError}
                    shoppingCart={shoppingCart}

                    />
        } else {
            return (
            <ButtonAdd 
                setShoppingCart={setShoppingCart} 
                productId={product.productId}
                setLoaderCart={setLoaderCart}
                setCartError={setCartError}
                >
                    Adicionar
            </ButtonAdd>)
        }
    }

    return (
        <s.Container>
            <ModalQuantity 
                setClose={setOpenBox}
                quantity={itemInCartQuantity}
                maxQuantity={product.quantityStock}
                open={openBox}
                setLoaderCart={setLoaderCart}
                setShoppingCart={setShoppingCart}
                setCartError={setCartError}
                productId={product.productId}
            />
            <s.Title title={product.name}>
                {product.name.substring(0, 55)}{product.name.length >= 55 && "..."}
            </s.Title>
            <div>
                <s.LocalCurrency>R$: </s.LocalCurrency>
                <s.ProductPrice>{product.price.toFixed(2).toString().replace(".", ",")}</s.ProductPrice>
            </div>
            <s.ProductQuantity>Quantidade: {product.quantityStock} unds</s.ProductQuantity>
            <ShowButton />

        </s.Container>
    );

};


export default CardProduct;