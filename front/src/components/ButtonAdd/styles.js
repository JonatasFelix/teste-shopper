import styled from "styled-components";

export const ButtonProductAdd = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;

    &:disabled {
        cursor: not-allowed;
        padding: 0;
        width: 90px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
