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

export const Status = styled.div`
    background-color: ${props => props.status === "Finalizado" 
    ? "#55ce63" 
    : "#ffbc34"};

    text-align: center;
    color: #FFFFFF;
    font-weight: 700;
    padding: 5px;
    border-radius: 5px;
`;

export const LoaderContainer = styled.div`
    margin: 0 auto;
`

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;

    #mobile {
        @media (max-width: 530px) {
            display: none;
        }
    }
`

export const Th = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

export const NoOrders = styled.h1`
    text-align: center;
    margin: 25px 0;
    color: #DA5726;
`

export const Tr = styled.tr`
        :nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export const Td = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`

export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    color: #DA5726;

    :hover {
        transform: scale(1.1);
    }
`;


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