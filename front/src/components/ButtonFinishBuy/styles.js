import styled from "styled-components";

export const ButtonFinishBuy = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;

    &:disabled {
        cursor: not-allowed;
    }
`

export const ButtonFinishBuyLoading = styled.button`
        cursor: not-allowed;
        padding: 0;
        width: 128px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #DA5726;
        color: #FFFFFF;
        border: none;
        border-radius: 10px;

`