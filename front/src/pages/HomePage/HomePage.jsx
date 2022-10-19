import * as s from "./styles"
import qs from "query-string";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { useProtectedPage } from "../../hooks/useProtectedPage";


import CardProduct from "../../components/CardProduct/CardProduct";
import Header from "../../components/Header/Header";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import Pagination from "../../components/Pagination/Pagination";
import SelectSort from "../../components/SelectSort/SelectSort";
import { getProductsList } from "../../services/Products/getProductsList";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {

    useProtectedPage()

    const { states, setters } = useContext(GlobalContext);
    const { token } = states;

    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalItens, setTotalItens] = useState(0);
    const [error, setError] = useState(false);
    const [order, setOrder] = useState("asc");
    const [sort, setSort] = useState("name");
    const [reload, setReload] = useState(false);

    const quantityItems = 10;
    
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
            search,
            token
        )
    }, [page, order, sort, search, reload, token]);

    const ShowLoader = () => {
        return arrayLoader.map((item, index) => {
            return <SkeletonLoader key={index} />;
        });
    }

    const ShowProducts = () => {
        return productsList.list.map((product) => {
            return <CardProduct key={product.productId} product={product} setters={setters} states={states} />;
        });
    };

    const ShowProductsCards = () => {
        return (
            productsList.list
                ? <ShowProducts />
                : <s.ErrorMsg>Xii! Não encontramos nenhum produto com esse nome!</s.ErrorMsg>
        )
    }

    const ShowErrorLoadindProducts = () => {
        return (
            <s.ErrorContainer>
                <s.ErrorMsg>Ops! Ocorreu um erro ao carregar os produtos!</s.ErrorMsg>

                {loading
                    ? <s.ErrorButton disabled><Loader height={"20px"} width={"20px"} /></s.ErrorButton>
                    : <s.ErrorButton onClick={() => setReload(!reload)}>Tentar novamente</s.ErrorButton>
                }

            </s.ErrorContainer>
        )
    }

    return (
        <div>
            <Header />

            <s.Container>
                {productsList.list &&

                    <s.BoxSelector>
                        <SelectSort setOrder={setOrder} setSort={setSort} />
                    </s.BoxSelector>
                }
                <s.ProductsContainer>
                    {error ? <ShowErrorLoadindProducts />
                        : loading
                            ? <ShowLoader />
                            : <ShowProductsCards />
                    }
                </s.ProductsContainer>
                {productsList.list &&
                    <Pagination
                        total={totalItens}
                        setPage={setPage}
                        quantityItems={quantityItems}
                    />
                }
            </s.Container>
        </div>
    )
};

export default HomePage;