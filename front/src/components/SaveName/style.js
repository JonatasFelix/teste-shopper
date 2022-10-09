import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(239,241,245,0.64);
    z-index: 5;

    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
`

export const Box = styled.div`
    width: 330px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 14px 8px rgb(0 0 0 / 40%);

    @media (min-width: 600px) {
        width: 415px;
        height: 300px;
    }

`

export const SaveName = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const Logo = styled.img`
    width: 180px
`

export const Input = styled.input`
    box-shadow: 0 0 0 0;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
    outline: 0;
    height: 32px;
    width: 210px;
    padding: 0 10px;
    font-size: 14px;
    margin-top: 14px;
`

export const Button = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 10px 35px;
`

export const DisplayNone = styled.div`
    display: none;
`