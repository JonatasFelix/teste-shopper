import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    background: #e86e5a;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ContainerForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 15px 30px;

    background-color: #ffffff;
    border-radius: 15px;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #000000;
`;

export const Img = styled.img`
    width: 250px;
`;

export const Button = styled.button`
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


export const SignUpButton = styled.button`
    border: none;
    border-radius: 6px;
    font-size: 17px;
    line-height: 48px;
    padding: 0 16px;
    background-color: #42b72a;
    color: #ffffff;

    &:hover {
        background-color: #2e8a1d;
    }
`;

export const Separator = styled.div`
    margin: 10px 0;
    background-color: #1c1e21;
    height: 1px;
    width: 100%;
`;

