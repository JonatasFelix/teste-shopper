import styled from "styled-components";

export const Container = styled.main`
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
    margin-top: 30px;

    display: flex;
    flex-direction: column;

    @media (max-width: 530px) {
        margin-top: 16px;
    }

`

export const BoxSelector = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 16px;
`

export const ProductsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
`


export const ErrorMsg = styled.h1`
    text-align: center;
    color: #DA5726;
    margin-top: 20px;
`