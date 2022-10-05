import styled from "styled-components";


export const Container = styled.div`
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #D9D9D9;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 250px;

    position: relative;

`
export const Title = styled.h1`
    font-size: 20px;
    color: #444444;
    text-align: center;
`

export const LocalCurrency = styled.span`
    font-size: 0.8rem;
    color: #DA5726;
`

export const ProductPrice = styled.span`
    font-size: 1.2rem;
    color: #000000;
`

export const ButtonProductAdd = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
`

export const ButtonProductUnavailable = styled.button`
    background-color: #D9D9D9;
    color: #FFFFFF;
    border: none;
    cursor: not-allowed;
`

export const ProductQuantity = styled.p`
    font-size: 0.8rem;
    color: #D9D9D9;
`