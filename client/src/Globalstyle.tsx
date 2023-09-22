import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #root{
        display:flex;
        justify-content: center;
    }

    body {
        background-color: #F5F6F8;
        font-family: 'Noto Sans KR', Roboto, sans-serif;
    }

    a {
        text-decoration: none;
    }

    button {
        border:none;
        background-color: transparent;
    }

`;

export default GlobalStyle;
