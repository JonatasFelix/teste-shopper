import styled from 'styled-components';

export const Container = styled.header`
    border-top: 5px solid #DA5726;
    background-color: #FFFFFF;
    box-shadow: 0px 5px 12px 0px rgb(0 0 0 / 30%);
`

export const Content = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
`

export const Logo = styled.img`
    width: 100px;
    cursor: pointer;
`

export const SerchBoxDesktop = styled.div`
    width: 50%;

    @media (max-width: 530px) {
        display: none;
    }
`

export const SerchBoxMobile = styled.div`
    display: none;
    @media (max-width: 530px) {
        display: block;
        margin: 20px auto 0 auto;
        padding: 0px 10px;
    }
`

export const CartIcon = styled.button`
    background-color: transparent;
    border-radius: 50%;
    padding: 5px;
    border: 0 none;
    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #F2F2F2;
    }
`


export const CartIconCount = styled.span`
    display: ${props => props.count > 0 ? 'block' : 'none'};
    position: absolute;
    border-radius: 50%;
    background-color: #DA5726;
    color: #FFFFFF;
    padding: 3px 8px;
    top: 7px;
    right: 28px;
`