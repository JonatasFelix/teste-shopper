import styled from "styled-components";

export const Container = styled.tr`
    :nth-child(even) {
        background-color: #f2f2f2;
    }
`

export const Td = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`

export const LoaderContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #ffffffc2;
`


export const QuantityUnavailableMsg = styled.p`
    color: #FF0000;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
`
