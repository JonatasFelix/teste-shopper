import styled, { keyframes } from "styled-components";

const skeletonAnimation = keyframes`
     to {
      background-position: 185px 0, center 0, center 115px, center 142px;
    }
`;

export const Container = styled.div``

export const Loader = styled.div`
    width: 250px;
    height: 250px;
    display: block;
    margin: auto;
    position: relative;
    background: #FFF;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #D9D9D9;

    &::after {
        content: '';
        width: calc(100% - 30px);
        height: calc(100% - 15px);
        top: 15px;
        left: 15px;
        position: absolute;
        background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
        linear-gradient(#DDD 100px, transparent 0),
        linear-gradient(#DDD 16px, transparent 0),
        linear-gradient(#DDD 50px, transparent 0);
        background-repeat: no-repeat;
        background-size: 75px 175px, 100% 100px, 100% 16px, 60% 35px;
        background-position: -185px 0, center 0, center 115px, center 142px;
        box-sizing: border-box;
        animation:  ${skeletonAnimation} 1s linear infinite;
    }
`
