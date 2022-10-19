import * as s from "./styles";
import Header from "../../components/Header/Header";
import { useState, useEffect, useContext } from "react";
import { getAllOrders } from "../../services/Orders/getAllOrders";
import GlobalContext from "../../context/GlobalContext";
import Loader from "../../components/Loader/Loader";
import { orderDetailsNavigation } from "../../routes/Coordinator";
import { useNavigate } from "react-router-dom";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { AiFillEye } from "react-icons/ai";

const OrdersPage = () => {
    useProtectedPage();

    const navigate = useNavigate();

    const { states } = useContext(GlobalContext);
    const { token } = states;

    const [orders, setOrders] = useState([])
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(true)

    const [reload, setReload] = useState(false)

    useEffect(() => {
        getAllOrders(token, setOrders, setLoader, setError)
    }, [token, reload])

    const handleOrderDetails = (id) => {
        orderDetailsNavigation(navigate, id)
    }


    const ShowOrders = () => {
        return orders
            .sort((a, b) => { return new Date(a.orderDate) - new Date(b.orderDate) })
            .map((order) => {
            return (
                <s.Tr key={order.id}>
                    <s.Td title={order.id}>{order.id.substring(0, 8)}</s.Td>
                    <s.Td>{
                        order.status === "completed"
                            ? <s.Status status={"Finalizado"}>Finalizado</s.Status>
                            : <s.Status status={"Pendente"}>Pendente</s.Status>
                    }
                    </s.Td>
                    <s.Td>R$: {order.total.toFixed(2).toString().replace(".", ",")} </s.Td>
                    <s.Td id="mobile">{new Date(order.orderDate).toLocaleDateString("pt-BR")}</s.Td>
                    <s.Td>
                        <s.Button onClick={() => handleOrderDetails(order.id)}>
                            <AiFillEye size={"26px"} title="Ver detalhes" />
                        </s.Button></s.Td>
                </s.Tr>
            )
        })
    }

    const ShowTableOrders = () => {
        return (
            <s.Table>
                <thead>
                    <tr>
                        <s.Th>Pedido</s.Th>
                        <s.Th>Status</s.Th>
                        <s.Th>Total</s.Th>
                        <s.Th id="mobile">Data</s.Th>
                        <s.Th>Detalhes</s.Th>
                    </tr>
                </thead>
                <tbody>
                    <ShowOrders />
                </tbody>
            </s.Table>
        )
    }



    const ShowLoader = () => {
        return (
            <s.LoaderContainer>
                <Loader width={"100px"} height={"100px"} />
            </s.LoaderContainer>
        )
    }

    const ShowError = () => {
        return (
            <s.ErrorContainer>
                <s.ErrorText>Ops! Algo deu errado.</s.ErrorText>
                <s.ErrorButton onClick={() => setReload(!reload)}>Tentar novamente</s.ErrorButton>
            </s.ErrorContainer>
        )
    }


    return (
        <>
            <Header />

            <s.Container>
                <s.Title>Meus Pedidos</s.Title>

                {
                    loader ? <ShowLoader />
                        : error ? <ShowError />
                            : orders.length > 0
                                ? <ShowTableOrders />
                                : <s.NoOrders>Não há pedidos</s.NoOrders>

                }

            </s.Container>
        </>
    )
};

export default OrdersPage;
