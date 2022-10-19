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

export const Img = styled.img`
    width: 250px;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #000000;
`;

export const EnterButton = styled.span`
    border: none;
    background: none;
    cursor: pointer;
    color: #DA5726;
`;

export const HaveAccount = styled.p`
    font-size: 16px;
    color: #000000;
    padding: 10px 0;
`;