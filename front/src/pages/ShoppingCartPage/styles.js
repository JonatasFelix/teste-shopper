import styled from "styled-components"

export const Container = styled.main`
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
    margin-top: 30px;

    display: flex;
    flex-direction: column;

    @media (max-width: 530px) {
        margin-top: 16px;
        padding: 0 5px;

    }
`

export const LoaderContainer = styled.div`
    margin: 0 auto;
`

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;

    @media (max-width: 530px) {
        #mobile {
            display: none;
        }
    }

`

export const Th = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`

export const EmptyCartMsg = styled.h1`
    text-align: center;
    color: #DA5726;
    margin-top: 20px;
`

export const BoxFinishBuy = styled.form`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f2;
    padding: 12px 5px;

    @media(max-width: 530px) {
        flex-direction: column;
        gap: 20px;
    }


`