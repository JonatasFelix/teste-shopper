import styled from "styled-components";

export const Modal = styled.div`
    display: ${props => props.open ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;


    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    border-radius: 10px;
    background: #ffff;
`

export const ModalContent = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    position: relative;


`

export const CloseButton = styled.button`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    bottom: 150px;
    left: 145px;

    background: none;
    border-radius: 50%;
    border: none;
    position: absolute;

    :hover {
        background: #D9D9D9;
        transition-duration: 0.3s;
    }
`

export const Input = styled.input`
    width: 60px;
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

export const ButtonUpdate = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
`

export const LoaderContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 3;
    background: #ffffffd1;
    cursor: wait;
`