import styled from "styled-components";

export const Modal = styled.div`
    display: ${props => props.open ? 'block' : 'none'};
    position: absolute;
`

export const ModalContent = styled.div`
    background: #FFFFFF;
    height: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

`