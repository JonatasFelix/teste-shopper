import styled from "styled-components";

export const FormContainer = styled.form`
    border: 1px solid #D9D9D9;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const SearchIcon = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    flex-grow: 0.5;
`

export const Input = styled.input`
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    height: 32px;
    flex-grow: 8.5;

    &:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }

`

export const SearchButton = styled.button`
    background-color: #DA5726;
    color: #FFFFFF;
    font-size: 1rem;
    border: 0 none;
    border-radius: 0 10px 10px 0;
    padding: 9px 10px;
    flex-grow: 1;
`


export const ClearButton = styled.div`
    cursor: pointer;
    background: #b4b4b5;
    border-radius: 50%;
    border: 0 none;
    margin: 0 5px;

    display: flex;
    align-items: center;
    justify-content: center;


`