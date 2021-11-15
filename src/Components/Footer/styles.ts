import styled from "styled-components";

export const Container = styled.footer`
    /* position: fixed;
    bottom: 0;
    width: 100%; */
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Copyright = styled.h1`
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    font-family: 'Montserrat';
    color: ${({theme}) => theme.colors.text};
`;