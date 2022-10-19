import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
    margin-top: 30px;

    display: flex;
    flex-direction: column;

    @media (max-width: 530px) {
        margin-top: 16px;
        margin-bottom: 10px;
    }
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;

`;

export const BackButton = styled.button`
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    
    color: #696969;
    width: 250px;

    display: flex;
    align-items: center;

    &:hover {
        text-decoration: underline;
    }

`;


export const ContainerOrderDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;


export const OrderStatus = styled.div`
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
`;

export const Status = styled.div`
    background-color: ${props => props.status === "pending" ? "#ffbc34" : "#55ce63"};
    text-align: center;
    color: #FFFFFF;
    font-weight: 700;
    padding: 5px;
    border-radius: 5px;
`;

export const Infos = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    @media (max-width: 530px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

`;

export const TitleInfos = styled.h2`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;

    @media (max-width: 530px) {
        margin-bottom: 5px;
    }
`;

export const TextInfos = styled.p`
    font-size: 1rem;
    text-align: center;
`;


export const ContainerOrderId = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    background: white;
    border-radius: 10px;
    padding: 10px 0;
`;

export const LoaderContainer = styled.div`
    margin: 0 auto;
`


export const OrderProducts = styled.table`
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
`;

export const Products = styled.div`
    background-color: #f5f5f5;
`;

export const Product = styled.tr`
        :nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export const Th = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

export const Td = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`

export const ErrorText = styled.h1`
    color: #DA5726;
`

export const ErrorButton = styled.button`
    background-color: #DA5726;
    border: none;
    color: #FFFFFF;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
`