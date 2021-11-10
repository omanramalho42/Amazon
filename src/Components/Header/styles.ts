import styled from "styled-components";

export const Container = styled.header`
    background-color: ${({ theme }) => theme.colors.background};
    text-align: start;
    padding: 20px;

    box-shadow: 0 0 12px 0 ${({ theme }) => theme.colors.shadow};
`;

export const Title = styled.h3`
    font-size: 2em;
`;