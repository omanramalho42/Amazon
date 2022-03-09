import styled from "styled-components"

export const Container = styled.form`
    padding: 100px;
    height: 100vh;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
`;

export const ListItem = styled.ul`
    display: flex;
    flex-direction: column;
`;

export const Item = styled.div`
    display: flex;
    width: 100%;

    padding: 15px;
    margin-bottom: 10px;

    justify-content: space-between;

    border-radius: 15px;

    transition: 0.325s;
    &:hover {
        box-shadow: 0 0 12px 2px rgba(0,0,0,0.2);
    }
`;

export const Label = styled.label`
    font-size: 1em;
    font-weight: 500;
    font-family: 'Montserrat';

    text-align: start;

    margin-right: 10px;

    color: ${({theme}) => theme.colors.text};
`;

export const CheckBox = styled.input`
    all: unset;
    
    border: none;
    border-radius: 5px;

    padding: 10px;
    background-color: ${({theme}) => theme.colors.effect};

    transition: 0.325s;
    &:hover {
        box-shadow: 0 0 12px 2px ${({theme}) => theme.colors.effect};
    }
`;

export const Title = styled.h1`
    font-size: 1.2em;
    font-weight: 500;
    font-family: 'Montserrat';
    
    color: ${({theme}) => theme.colors.text};

    text-align: center;

    margin-top: 35px;
`;

export const Titleback = styled.h1`
    font-size: 1.2em;
    font-weight: 500;
    font-family: 'Montserrat';

    color: ${({theme}) => theme.colors.text};

    text-align: center;

    margin-top: 40px;

    &:hover {
        cursor: pointer;
        color: ${({theme}) => theme.colors.effect};
    }
`;

export const Button = styled.button`
    display: flex;
    
    margin-top: 30px;
    padding: 15px;
    
    background-color: ${({theme}) => theme.colors.effect};

    border: none;
    border-radius: 15px;

    color: ${({theme}) => theme.colors.primary};

    text-transform: uppercase;
    font-family: 'Montserrat';
    font-weight: 600;

    transition: 0.325s;
    &:hover {
        background-color: ${({theme}) => theme.colors.effect_secondary};
        box-shadow: 0 0 12px 2px ${({theme}) => theme.colors.effect_secondary};        
    }
`;