import styled from "styled-components";


export const Container = styled.div`
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #D9D9D9;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 250px;
    height: 250px;

    position: relative;

`

export const Title = styled.h1`
    font-size: 1.1rem;
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

export const ProductQuantity = styled.p`
    font-size: 0.8rem;
    color: #D9D9D9;
`