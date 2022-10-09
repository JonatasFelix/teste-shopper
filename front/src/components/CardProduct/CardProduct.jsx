import { useState, useEffect } from "react";
import * as s from "./styles"
import ButtonLessAndMore from "../ButtonLessAndMore/ButtonLessAndMore";
import ModalQuantity from "../ModalQuantity/ModalQuantity";
import ButtonUnavailable from "../ButtonUnavailable/ButtonUnavailable";
import ButtonAdd from "../ButtonAdd/ButtonAdd";

// CARD PRODUCT - RECEBE:
// PRODUCT - OBJETO COM AS INFORMAÇÕES DO PRODUTO
// STATES - OBJETO COM OS ESTADOS DO CARRINHO -- GLOBAL CONTEXT
// SETTERS - OBJETO COM AS FUNÇÕES PARA ATUALIZAR OS ESTADOS DO CARRINHO -- GLOBAL CONTEXT


const CardProduct = ({product, states, setters}) => {
    const { shoppingCart } = states;
    const { setShoppingCart, setLoaderCart, setCartError } = setters;
    const [itemInCartQuantity, setItemInCartQuantity] = useState(0);

    const [openBox, setOpenBox] = useState(false);  // ESTADO PARA ABRIR OU FECHAR A MODAL DE QUANTIDADE
    
    // ATUALIZA A QUANTIDADE DO PRODUTO QUE O CARD MOSTRA TODA VEZ QUE O CARRINHO É ATUALIZADO
    useEffect(() => {
        setItemInCartQuantity(shoppingCart.list?.find((item) => item.productId === product.productId)?.quantity || 0)
    }, [shoppingCart, product.productId]);

    // FUÇÃO PARA MOSTRAR O BOTÃO CORRETAMENTE
    // SE O PRODUTO ESTIVER INDISPONÍVEL, MOSTRA O BOTÃO DE INDISPONÍVEL
    // SE O PRODUTO ESTIVER DISPONÍVEL, MOSTRA O BOTÃO DE ADICIONAR OU DE QUANTIDADE
    // SE O PRODUTO ESTIVER NO CARRINHO, MOSTRA O BOTÃO DE QUANTIDADE
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