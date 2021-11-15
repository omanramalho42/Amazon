import styled from "styled-components";

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background};
    text-align: start;
    padding: 20px;

    box-shadow: 0 0 12px 0 ${({ theme }) => theme.colors.shadow};
`;

export const Button = styled.button`
    border: none;
    background-color: ${({ theme })=> theme.colors.effect};
    align-items: center;
    
    width: 70px;
    height: 34px;
    
    border-radius: 25px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
`;

interface IconProps {
    thema: string;
}

export const Icon = styled.img<IconProps>`
    position: relative;
    right: ${({ thema }) => thema === 'light' ? 18.5 : -18.5}px;
    margin: auto;
    
    width: 34px;
    height: 34px;

    transition: 0.3s;
`;

export const Title = styled.h3`
    font-size: 1em;
    margin: 10px;
    color: ${({theme}) => theme.colors.text};
    &:hover {
        cursor: pointer;
    }
`;

export const Link = styled.a`
    &:hover {
        cursor: pointer;
        border-bottom: 3px solid ${({theme}) => theme.colors.text};
    }
`;

export const Nav = styled.nav`
    align-items: center;
    display: flex;
`;

export const Content = styled.div``;

export const Badge = styled.div`
    background-color: ${({ theme }) => theme.colors.effect};
    border-radius: 25px;

    width: 20px;
    height: 20px;

    transition: 0.2s;
    &:hover {
        transform: scale(1.1);
        background-color: ${({theme}) => theme.colors.effect_secondary};
    }
`;

export const Notification = styled.h5`
    margin-top: 1.5px;
    text-align: center;
    color: ${({theme}) => theme.colors.text};
`;