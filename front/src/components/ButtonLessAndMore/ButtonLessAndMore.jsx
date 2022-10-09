import * as s from './styles';
import { useState } from 'react';
import { putProductQuantityCart } from '../../services/putProductQuantityCart';
import { getShoppingCartList } from '../../services/getShoppingCartList';
import { deleteProductShoppingCart } from '../../services/deleteProductShoppingCart';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

// BUTTON LESS AND MORE - RECEBE:
// maxQuantity: QUANTIDADE MÁXIMA DO PRODUTO - QUANTIDADE EM ESTOQUE
// quantity: QUANTIDADE DO PRODUTO NO CARRINHO
// setOpenBox: FUNÇÃO QUE ABRE O BOX DE ALTERAR QUANTIDADE
// setShoppingCart: FUNÇÃO QUE ATUALIZA O ESTADO DO CARRINHO -- GLOBAL CONTEXT --
// productId: ID DO PRODUTO
// setLoaderCart: FUNÇÃO QUE ATUALIZA O ESTADO DO LOADER DO CARRINHO -- GLOBAL CONTEXT --
// setCartError: FUNÇÃO QUE ATUALIZA O ESTADO DO ERRO DO CARRINHO -- GLOBAL CONTEXT --

const ButtonLessAndMore = ({
    maxQuantity, 
    quantity, 
    setOpenBox, 
    setShoppingCart, 
    productId, 
    setLoaderCart, 
    setCartError, 
}) => {

    const [loading, setLoading] = useState(false);      // LOADING

    // FUNÇÃO QUE ALTERA A QUANTIDADE DE UM EM UM DO PRODUTO NO CARRINHO
    const handleAdd = async () => {
        setLoading(true);                                                       // ATIVA O LOADING                 
        await putProductQuantityCart(quantity + 1, productId)                   // FAZ A REQUISIÇÃO PARA ALTERAR A QUANTIDADE DO PRODUTO NO CARRINHO
            .then(() => toast.success("Quantidade alterada com sucesso!"))      // SE A REQUISIÇÃO FOR BEM SUCEDIDA, MOSTRA UMA MENSAGEM DE SUCESSO
            .catch(() => toast.error("Não foi possível alterar a quantidade!")) // SE A REQUISIÇÃO NÃO FOR BEM SUCEDIDA, MOSTRA UMA MENSAGEM DE ERRO
            
        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError);// FAZ A REQUISIÇÃO PARA ATUALIZAR O CARRINHO NA TELA
        setLoading(false);                                                      // DESATIVA O LOADING  
    }

    // FUNÇÃO QUE ALTERA A QUANTIDADE DE UM EM UM DO PRODUTO NO CARRINHO OU REMOVE O PRODUTO DO CARRINHO
    const handleRemove = async() => {
        setLoading(true);                                                               // ATIVA O LOADING                                     
        if (quantity > 1) {                                                             // CONDICIONAL PARA VERIFICAR SE A QUANTIDADE É MAIOR QUE 1
            await putProductQuantityCart(quantity - 1, productId)                       // FAZ A REQUISIÇÃO PARA ALTERAR A QUANTIDADE DO PRODUTO NO CARRINHO
                .then(() => toast.success("Quantidade alterada com sucesso!"))          // SE A REQUISIÇÃO FOR BEM SUCEDIDA, MOSTRA UMA MENSAGEM DE SUCESSO
                .catch(() => toast.error("Não foi possível alterar a quantidade!"))     // SE A REQUISIÇÃO NÃO FOR BEM SUCEDIDA, MOSTRA UMA MENSAGEM DE ERRO
        
        } else {                                                                        // CASO A QUANTIDADE SEJA IGUAL A 1
            await deleteProductShoppingCart(productId)                                  // FAZ A REQUISIÇÃO PARA REMOVER O PRODUTO DO CARRINHO    
                .then(() => toast.success("Produto removido com sucesso!")) 
                .catch(() => toast.error("Não foi possível remover o produto!"))
        }

        await getShoppingCartList(setLoaderCart, setShoppingCart, setCartError)         // FAZ A REQUISIÇÃO PARA ATUALIZAR O CARRINHO NA TELA
        setLoading(false);                                                              // DESATIVA O LOADING
    }


    // FUNÇÃO ALTERA A QUANTIDADE DO PRODUTO NO CARRINHO PARA MAIS DE UM EM UM
    const ButtonMore = () => {
        return (
            quantity < maxQuantity                                  // CONDICIONAL PARA VERIFICAR SE A QUANTIDADE É MENOR QUE A QUANTIDADE MÁXIMA
            ? <s.ButtonMore onClick={handleAdd}>+</s.ButtonMore>    // CASO SEJA, MOSTRA O BOTÃO DE MAIS
            : <s.ButtonMore disabled>+</s.ButtonMore>               // CASO NÃO SEJA, MOSTRA O BOTÃO DE MAIS DESABILITADO
        )
    }

    // FUNÇÃO MOSTRA O BOTÃO MENOS DE ACORDO COM A QUANTIDADE DO PRODUTO NO CARRINHO
    const ButtonLess = () => {
        return ( 
            <s.ButtonLess onClick={handleRemove}>-</s.ButtonLess> 
        )
    }

    // FUNÇÃO QUE ABRE O BOX DE ALTERAR QUANTIDADE
    const ButtonQuantity = () => {
        return (
            <s.ButtonQuantity onClick={() => setOpenBox(true)}>{quantity}</s.ButtonQuantity>
        )
    }


    return (
        <s.Container>
            {loading && <s.LoaderContainer><Loader width={"30px"} height={"30px"}/></s.LoaderContainer>}
            <ButtonLess />
            <ButtonQuantity title={`Tem apenas ${maxQuantity} unidades em estoque`} />
            <ButtonMore />
        </s.Container>
    )


};

export default ButtonLessAndMore;