import styled from "styled-components";

export const Container = styled.form`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
`

export const Input = styled.input`
    width: 80px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 0;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    text-align: center;

    /* REMOVE AS SETAS DO INPUT TIPO NUMBER */
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
`

export const Button = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 8px 20px;

    &:disabled {
        cursor: not-allowed;
        height: 32px;
        width: 80px;
    }
`