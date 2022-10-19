import styled from "styled-components";

export const ContainerForm = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

export const Title = styled.h1 `
    font-size: 1.5rem;
    font-weight: bold;
    margin: 20px 0;
`;

export const Form = styled.form `
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding: 20px;
`;

export const CepSearch = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Button = styled.button`
    margin: 0 auto;
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    min-width: 250px;
    max-width: 560px;
    padding: 10px 0;
    margin-top: 15px;

    &:disabled {
        cursor: wait;
    }
`;