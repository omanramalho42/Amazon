import styled, { ThemeConsumer } from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'

export const Container = styled.div`
    padding: 50px 100px;
    min-height: 100vh;
`;

export const Cart = styled.div`
    display: flex;
    flex-direction: column;

    min-width: 410px;
    
    border-radius: 25px;

    padding: 20px;
    margin-top: 15px;
    box-shadow: 0 0 12px 5px rgba(0,0,0,.2);

`;

export const Price = styled.div`
    display: flex;

    padding: 10px;

    color: ${({theme}) => theme.colors.text};
`;

export const Title = styled.h1`
    font-family: 'Montserrat';
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2em;
    text-align: start;
    
    color: ${({ theme }) => theme.colors.text};
    margin-top: 20px;
    margin-bottom: 30px;
`;
export const Text = styled.h4`
    font-family: 'Montserrat';
    
    text-transform: uppercase;
    font-weight: 600;
    
    color: ${({ theme }) => theme.colors.text};
`;

export const TextButton = styled.h4`
    font-family: 'Montserrat';
    
    text-transform: uppercase;
    font-weight: 600;
    
    margin: auto;
    color: ${({ theme }) => theme.colors.text};
`;

export const ContentInfo = styled.div`
    margin-top: 20px;
    width: 120px;
    height: calc(100vh - 300px);
`;

export const TextLink = styled.h4`
    color: ${({theme}) => theme.colors.effect};
    &:hover {
        color: ${({theme}) => theme.colors.effect_secondary};
    }
`;

export const CartItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    
    margin-bottom: 10px;
    padding: 10px;
    align-items: center;

    border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
`;

export const ContainerImage = styled.div``;

export const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 25px;

    transition: 0.325s;
    
    &:hover {
        box-shadow: 0 0 12px 2px rgba(80,80,80,0.8);
        transform: scale(1.05);
    }
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    margin-left: 10px;
    padding: 10px;
`;

export const Paragraph = styled.p`
    color: ${({ theme }) => theme.colors.text};
`;

export const Link = styled.a`
    text-decoration: none;
`;

export const CardAction = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.colors.text};
`;

export const Button = styled.button`
    display: flex;

    border: none;
    padding: 20px;
    
    border-radius: 15px;
    background-color: ${({theme}) => theme.colors.effect};

    margin-top: 10px;

    transition: background-color 0.325s;
    &:hover {
        background-color: ${({theme}) => theme.colors.effect_secondary};
        box-shadow: 0 0 15px 3px ${({theme}) => theme.colors.effect_secondary};
    }
`;

export const IconClose = styled(AiOutlineClose)`
    font-size: 25px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Total = styled.div`
    display: flex;
    margin-top: 20px;

    justify-content: center;
`;

export const TotalContent = styled.div`
    display: flex;
    flex-direction: column;

    width: 500px;

    margin-top: 20px;
    border-radius: 25px;
    
    padding: 20px;
    box-shadow: 0 0 12px 5px rgba(0,0,0,.2);
`;

export const Value = styled.div`
    display: flex;
    padding: 15px;

    font-size: 0.9em;
    font-weight: bold;
    font-family: 'Montserrat';

    justify-content: space-between;

    color: ${({ theme }) => theme.colors.text};
`;

export const Strong = styled.strong`
    font-weight: bold;
    font-family: 'Montserrat';
    font-size: 1em;
    margin: auto;
    
    text-transform: uppercase;
    
    color: ${({ theme }) => theme.colors.effect};
`;
