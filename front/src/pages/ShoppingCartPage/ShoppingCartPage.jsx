import * as s from './styles';
import Header from "../../components/Header/Header";
import CardShoppingCartProduct from "../../components/CardShoppingCartProduct/CardShoppingCartProduct";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import DatePicker from '../../components/DatePicker/DatePicker';
import ButtonFinishBuy from '../../components/ButtonFinishBuy/ButtonFinishBuy';
import { useProtectedPage } from "../../hooks/useProtectedPage";
import Loader from '../../components/Loader/Loader';

const ShoppingCart = () => {

    useProtectedPage()

    const [error, setError] = useState(false);
    const [date, setDate] = useState(undefined);
    const { states, setters } = useContext(GlobalContext);
    const { shoppingCart, loaderCart } = states;

    const ShowCartProductInStockProducts = () => {
        return shoppingCart.list.map((product, index) => {
            return <CardShoppingCartProduct key={index} states={states} setters={setters} product={product} />
        })
    }

    const ShowCartProductOutOfStockProducts = () => {
        return shoppingCart.outStock.map((product, index) => {
            return <CardShoppingCartProduct key={index} states={states} setters={setters} product={product} />
        })
    }

    const ShowTableInStockProducts = () => {
        return (
            <s.Table>
                <thead>
                    <tr>
                        <s.Th>Nome</s.Th>
                        <s.Th>Preço</s.Th>
                        <s.Th>Quantidade</s.Th>
                        <s.Th id="mobile">Total</s.Th>
                        <s.Th>Remover</s.Th>
                    </tr>
                </thead>
                <tbody>
                    <ShowCartProductInStockProducts />
                </tbody>
            </s.Table>
        )
    }

    const ShowTableOutOfStockProducts = () => {
        return (
            <s.Table>
                <thead>
                    <tr>
                        <s.Th>Nome</s.Th>
                        <s.Th>Preço</s.Th>
                        <s.Th>Quantidade</s.Th>
                        <s.Th>Total</s.Th>
                        <s.Th>Remover</s.Th>
                    </tr>
                </thead>
                <tbody>
                    <ShowCartProductOutOfStockProducts />
                </tbody>
            </s.Table>
        )
    }

    const ShowEmptyOrProcuts = () => {
        return (
            shoppingCart.list?.length ?
                <ShowTableInStockProducts />
                : <s.EmptyCartMsg>Seu carrinho está vazio</s.EmptyCartMsg>)
    }

    const ShowEmptyOrOutOfStockProcuts = () => {
        return shoppingCart.outStock?.length > 0 && (
            <>
                <h1>Produtos fora de estoque</h1>
                <ShowTableOutOfStockProducts />
            </>
        )
    }

    const ShowLoader = () => {
        return (
            <s.LoaderContainer>
                <Loader width={"100px"} height={"100px"} />
            </s.LoaderContainer>
        )
    }

    return (
        <div>
            <Header />
            <s.Container>
                <h1>Carrinho</h1>

                {loaderCart
                    ? <ShowLoader />
                    : <ShowEmptyOrProcuts />}

                <s.BoxFinishBuy onSubmit={(e) => e.preventDefault()}>
                    <DatePicker dateState={date} setDateState={setDate} error={error} cartEmpty={shoppingCart.list?.length} />
                    <p>Total: R$:
                        {shoppingCart.totalValue
                            ? shoppingCart.totalValue.toFixed(2).toString().replace(".", ",")
                            : "0,00"
                        }
                    </p>
                    <ButtonFinishBuy
                        date={date?.toISOString()}
                        setters={setters}
                        states={states}
                        setError={setError}
                    />
                </s.BoxFinishBuy>

                <ShowEmptyOrOutOfStockProcuts />

            </s.Container>
        </div>
    )
};

export default ShoppingCart;