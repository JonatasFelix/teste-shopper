import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    border: 5px solid #d6d6d6;
    border-bottom-color: #DA5726;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotate} 1s linear infinite;

`