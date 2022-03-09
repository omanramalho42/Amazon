import { AiOutlineShoppingCart } from "react-icons/ai";
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

export const Nome = styled.h5`
    color: black;
`;
interface ButtonToggleProps {
    active: string;
}

export const Button = styled.button<ButtonToggleProps>`
    border: none;
    background-color: ${({ theme }) => theme.colors.effect};
    align-items: center;
    
    width: 70px;
    height: 34px;

    margin-left: 5px;
    
    border-radius: 25px;
    box-shadow: 0 0 6px 3px rgba(0,0,0,0.3);

    transition: box-shadow 0.325s;
    
    &:hover {    
        box-shadow: ${({ active }) => 
            active === 'light' 
            ? '0 0 12px 3px rgba(0, 0, 255)' 
            : '0 0 12px 3px rgba(255,140,0)'
        };
    }
`;

interface UserButtonProps {
    user?: string;
}

export const UserButton = styled.button<UserButtonProps>`
    border: none;
    background-color: transparent;
    align-items: center;
    
    width: 70px;
    height: 34px;

    margin-left: 5px;
    
    border-radius: 25px;
    box-shadow: 0 0 12px 3px rgba(0,0,0,.1)};
    
    transition: 0.325s;
    &:hover {
        box-shadow: 0 0 15px 1px ${({theme}) => theme.colors.effect};
    }
`;

export const Image = styled.img`
    display: flex;
    width: 100px; 
    height: 50px;
`;

export const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

interface IconProps {
    thema: string;
}

export const IconCart = styled(AiOutlineShoppingCart)`
    color: ${({theme}) => theme.colors.text};
    font-size: 1.75em;

    cursor: pointer;

    margin-bottom: 20px;

    transition: 0.325s;
    &:hover {
        color: ${({theme}) => theme.colors.effect};
    }
`;

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
    cursor: pointer;
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
`;

export const Badge = styled.div`
    background-color: ${({ theme }) => theme.colors.effect};
    border-radius: 25px;

    width: 20px;
    height: 20px;

    margin-left: 15px;

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