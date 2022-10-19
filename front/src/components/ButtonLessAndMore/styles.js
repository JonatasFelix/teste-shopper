import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-wrap: nowrap;
    
    @media (max-width: 460px) {
        flex-wrap: wrap;
    }
`

export const ButtonMore = styled.button`
    background-color: #05FF00;
    color: #FFFFFF;
    font-size: 24px;
    border-radius: 50%;
    padding: 1px 10px;
    border: 0 none;

    &:hover {
        transform: scale(1.1);
    }


    &:disabled {
        background-color: #444444;
        cursor: not-allowed;

        &:hover {
            transform: scale(1);
        }
    }
`

export const ButtonLess = styled.button`
    background-color: #FF0000;
    color: #FFFFFF;
    font-size: 24px;
    border-radius: 50%;
    padding: 1px 13px;
    border: 0 none;

    &:hover {
        transform: scale(1.1);
    }
`

export const ButtonQuantity = styled.button`
    width: 60px;
    height: 32px;

    box-shadow: 0 0 0 0;
    outline: 0;

    border: 1px solid #D9D9D9;
    border-radius: 10px;

    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;

    cursor: pointer;

    background: transparent;

    &:hover {
        transform: scale(1.1);
    }

`

export const LoaderContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #ffffffc2;

`
