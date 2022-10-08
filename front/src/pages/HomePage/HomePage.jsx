import * as s from "./styles"
import qs from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CardProduct from "../../components/CardProduct/CardProduct";
import Header from "../../components/Header/Header";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import Pagination from "../../components/Pagination/Pagination";
import SelectSort from "../../components/SelectSort/SelectSort";
import { getProductsList } from "../../services/getProductsList";


const HomePage = () => {

    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalItens, setTotalItens] = useState(0);
    const [error, setError] = useState(false);
    const [quantityItems, setQuantityItems] = useState(10);
    const [order, setOrder] = useState("asc");
    const [sort, setSort] = useState("name");
   
    const arrayLoader = Array(quantityItems).fill("")

    const location = useLocation();
    const parsed = qs.parse(location.search);
    const searchQuery = parsed.q;

    const search = searchQuery ? searchQuery : ""

    useEffect(() => {
        getProductsList(
            setError,
            setLoading,
            setProductsList,
            setTotalItens,
            page.selected + 1,
            quantityItems,
            order,
            sort,
            search
            )
    }, [page, order, sort, search, quantityItems]);


    const ShowProducts = () => {
        return productsList.list.map((product) => {
            return <CardProduct key={product.productId} {...product} />;
        });
    };

    const ShowLoader = () => {
        return arrayLoader.map((item, index) => {
            return <SkeletonLoader key={index} />;
        });
    }

    return (
        <div>
            <Header />
            <s.Container>
                <s.BoxSelector>
                    <SelectSort setOrder={setOrder} setSort={setSort}/>
                </s.BoxSelector>
                <s.ProductsContainer>
                    {error ? <p>Erro ao carregar os produtos</p> 
                    : loading 
                    ? <ShowLoader/>
                    :<ShowProducts /> }
                </s.ProductsContainer>
                {productsList.list && <Pagination total={totalItens} setPage={setPage}/>}
            </s.Container>
        </div>
    )
};

export default HomePage;