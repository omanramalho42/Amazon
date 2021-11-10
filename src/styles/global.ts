import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *,html {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({ theme }) => theme.colors.primary};
        font-family: "Roboto", "Montserrat", sans-serif;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle