import styled from 'styled-components'
import dark from '../theme/dark';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 5vh;
    grid-row-gap: 5vh;
    padding: 20px 100px;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        padding: 70px;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        padding: 50px;
    }
`;

export const Welcome = styled.h1`
    margin-left: 100px;
    margin-top: 30px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text};

`;

export const Grid = styled.div`
    background-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 15px 15px;

    transition: 0.2s;

    &:hover {
        transform: scale(1.05);
        opacity: 0.9;
        box-shadow: 0 0 16px 3px ${({ theme }) => 
            theme.colors.effect
        };
    }
`;

export const Card = styled.div``;

export const CardActionArea = styled.div``;

export const CardContent = styled.div`
    margin: 15px;
`;

export const CardActions = styled.div`
    margin-top: 20px;
    margin-bottom: 15px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.h4`
    color: ${({ theme }) => theme.colors.text};
    font-size: 1em;
    margin-right: 10px;
`;

export const Button = styled.button`
    border: none;
    background-color: transparent;

    color: ${({theme}) => theme.colors.effect};
    text-transform: uppercase;
    font-weight: bold;
`;