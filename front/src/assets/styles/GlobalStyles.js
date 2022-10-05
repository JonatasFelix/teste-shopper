import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *   {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
        font-family: 'Roboto', sans-serif;
        flex-wrap: wrap;
        list-style-type: none;
    }
    body {
        width: 100%;
        height: 100%;
    }
    button {
        cursor: pointer;
    }
    label {
        cursor: pointer;
    }
`;

export default GlobalStyle;