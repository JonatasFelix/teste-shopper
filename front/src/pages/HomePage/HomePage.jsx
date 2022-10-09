import * as s from "./styles"
import qs from "query-string";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";


import CardProduct from "../../components/CardProduct/CardProduct";
import Header from "../../components/Header/Header";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import Pagination from "../../components/Pagination/Pagination";
import SelectSort from "../../components/SelectSort/SelectSort";
import { getProductsList } from "../../services/getProductsList";

const HomePage = () => {

    const { states, setters } = useContext(GlobalContext);

    const [productsList, setProductsList] = useState([]);   // LISTA DE PRODUTOS
    const [loading, setLoading] = useState(true);           // LOADING
    const [page, setPage] = useState(0);                    // PAGINA ATUAL
    const [totalItens, setTotalItens] = useState(0);        // TOTAL DE ITENS PARA GERAR PAGINAÇÃO
    const [error, setError] = useState(false);              // ERRO
    const [order, setOrder] = useState("asc");              // ORDEM DE ORDENAÇÃO - ASC OU DESC
    const [sort, setSort] = useState("name");               // TIPO DE ORDENAÇÃO - NAME OU PRICE

    // QUANTIDADE DE INTENS QUE SERÃO MOSTRADOS NA PAGINA
    const quantityItems = 10;

    // ARRAY FAKE COM A QUANTIDADE DE ITENS PARA GERAR O SKELTON LOADER
    const arrayLoader = Array(quantityItems).fill("")

    // PEGA OS PARAMETROS DA URL
    const location = useLocation();
    const parsed = qs.parse(location.search);
    const searchQuery = parsed.q;

    // VERIFICA SE TEM ALGUM PARAMETRO NA URL
    const search = searchQuery ? searchQuery : ""


    // FAZ A REQUISIÇÃO DOS PRODUTOS E ATUALIZA O ESTADO QUANDO A PÁGINA É CARREGADA E
    // QUANDO OS PARAMETROS DE PAGINAÇÃO, ORDENAÇÃO E BUSCA SÃO ALTERADOS
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
    }, [page, order, sort, search]);

    // MAP DA ARRAY FAKE PARA GERAR O SKELTON LOADER
    const ShowLoader = () => {
        return arrayLoader.map((item, index) => {
            return <SkeletonLoader key={index} />;
        });
    }

    // MAP DA ARRAY DE PRODUTOS PARA GERAR OS COMPONENTES DE PRODUTOS
    const ShowProducts = () => {
        return productsList.list.map((product) => {
            return <CardProduct key={product.productId} product={product} setters={setters} states={states} />;
        });
    };

    // CONDICIONAL PARA MOSTRAR RENDERIZAR CARDS DOS PRODUTOS OU A 
    // MENSSAGEM DE NENHUM PRODUTO ENCONTRADO
    const ShowProductsCards = () => {
        return (
            productsList.list
                ? <ShowProducts /> 
                : <s.ErrorMsg>Xii! Não encontramos nenhum produto com esse nome!</s.ErrorMsg>
        )
    }

    return (
        <div>
            <Header />

            <s.Container>
                {productsList.list &&                                       // CONDICIONAL PARA MOSTRAR O SELECT DE ORDENAÇÃO
                   // COMPONENTE DE ORDENAÇÃO
                   <s.BoxSelector>     
                        <SelectSort setOrder={setOrder} setSort={setSort} />
                    </s.BoxSelector>
                }
                <s.ProductsContainer>
                    {error ? <p>Erro ao carregar os produtos</p>    // CONDICIONAL PARA MOSTRAR A MENSSAGEM DE ERRO
                        : loading
                            ? <ShowLoader />            // RENDERIZA O SKELTON LOADER
                            : <ShowProductsCards />     // RENDERIZA OS CARDS DOS PRODUTOS OU A MENSAGEM DE NADA ENCONTRADO
                    }
                </s.ProductsContainer>
                {productsList.list &&                                   // CONDICIONAL PARA MOSTRAR A PAGINAÇÃO
                    <Pagination total={totalItens} setPage={setPage} /> // RENDERIZA A PAGINAÇÃO
                }
            </s.Container>
        </div>
    )
};

export default HomePage;