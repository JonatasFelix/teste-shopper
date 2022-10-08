import styled from "styled-components"

export const BoxPagination = styled.div`
    padding: 10px 0;

    .pagination {
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .page-item {
        font-size: 1.5rem;
        padding: 3px 10px;
        cursor: pointer;
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        border: 1px solid #D9D9D9;
        color: #DA5726;
        border-radius: 6px;
    }

    .disabled {
        color: #E3BEA6;
        cursor: default;
    }

`