import * as s from "./styles";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { useContext, useState, useEffect } from "react";
import { getOrderDetails } from "../../services/Orders/getOrderDetails";
import { useNavigate } from "react-router-dom";
import { ordersNavigation } from "../../routes/Coordinator";
import { IoChevronBackOutline } from "react-icons/io5";
import Loader from "../../components/Loader/Loader";
import { useProtectedPage } from "../../hooks/useProtectedPage";

const OrdersDetailsPage = () => {
    useProtectedPage();

    const navigate = useNavigate();

    const { id } = useParams();
    const { states } = useContext(GlobalContext);
    const { token } = states;

    const [order, setOrder] = useState({})
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(true)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getOrderDetails(id, token, setLoader, setError, setOrder)
    }, [id, token, reload])

    const ShowProductsList = () => {
        return order.products.map((product) => {
            return (
                <s.Product>
                    <s.Td>{product.name}</s.Td>
                    <s.Td>{product.quantity}</s.Td>
                </s.Product>
            )
        })
    }

    const ShowOrderDetails = () => {
        return (
            <s.ContainerOrderDetails>
                <s.OrderStatus>
                    <s.Status status={order.status}>
                        {
                            order.status === "pending"
                                ? "Pendente"
                                : "Finalizado"
                        }
                    </s.Status>

                    <s.Infos>

                        <div>
                            <s.TitleInfos>Cliente</s.TitleInfos>
                            <s.TextInfos>{order.userName}</s.TextInfos>
                        </div>

                        <div>
                            <s.TitleInfos>Data do pedido</s.TitleInfos>
                            <s.TextInfos>{new Date(order.orderDate).toLocaleDateString("pt-BR")}</s.TextInfos>
                        </div>

                        <div>
                            <s.TitleInfos>Data de entrega</s.TitleInfos>
                            <s.TextInfos>{new Date(order.appointmentDate).toLocaleDateString("pt-BR")}</s.TextInfos>
                        </div>

                        <div>
                            <s.TitleInfos>Valor total</s.TitleInfos>
                            <s.TextInfos>R$: {order.total.toFixed(2).toString().replace(".", ",")}</s.TextInfos>
                        </div>

                    </s.Infos>

                    <s.ContainerOrderId>
                        <h2>ID DO PEDIDO: </h2>
                        <span>{order.id}</span>
                    </s.ContainerOrderId>


                </s.OrderStatus>

                <s.OrderProducts>
                    <thead>
                        <tr>
                            <s.Th>Produto</s.Th>
                            <s.Th>Quantidade</s.Th>
                        </tr>
                    </thead>
                    <tbody>
                        <ShowProductsList />
                    </tbody>
                </s.OrderProducts>

            </s.ContainerOrderDetails>
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
                <s.Title>Detalhes do pedido</s.Title>
                <s.BackButton onClick={() => ordersNavigation(navigate)}>
                    <IoChevronBackOutline />
                    Voltar
                </s.BackButton>

                {
                    loader
                        ? <ShowLoader />
                        : error
                            ? <ShowError />
                            : <ShowOrderDetails />
                }

            </s.Container>
        </>
    )
}

export default OrdersDetailsPage;
