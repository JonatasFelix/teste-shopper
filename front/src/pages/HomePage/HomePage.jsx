import CardProduct from "../../components/CardProduct/CardProduct";
import Header from "../../components/Header/Header";
import * as s from "./styles"

const HomePage = () => {

    const products = [
        {
            id: 1,
            title: "Camiseta",
            price: 20,
            quantity: 1,
        },
        {
            id: 2,
            title: "Calça",
            price: 50,
            quantity: 1,
        },
        {
            id: 3,
            title: "Meia",
            price: 10,
            quantity: 1,
        },
        {
            id: 4,
            title: "Boné",
            price: 30,
            quantity: 0,
        },
    ];

    const ShowProducts = () => {
        return products.map((product) => {
            return <CardProduct key={product.id} {...product} />;
        });
    };


    return (
        <div>
            <Header />
            <s.Container>
                <ShowProducts />
            </s.Container>
        </div>
    )
};

export default HomePage;