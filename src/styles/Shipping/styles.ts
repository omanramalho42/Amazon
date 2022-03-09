import styled from "styled-components"

export const Container = styled.div`
    padding: 0 100px;
    min-height: 100vh;
`;

export const Title = styled.h3`
    text-align: center;
    font-size: 1.5em;
    font-family: 'Montserrat';
    font-weight: 700;
    text-transform: uppercase;

    color: ${({theme}) => theme.colors.text};
    margin-top: 50px;
`;

export const Text = styled.h5`
    font-size: 1em;
    font-weight: 600;

    color: ${({theme}) => theme.colors.text};
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 700px;
`;

interface InputProps {
    error: boolean;
}

export const Input = styled.input<InputProps>`
    display: flex;
    border: none;
    
    padding: 15px;
    margin: 10px;
    border-radius: 25px;
    
    background-color: ${({theme}) => theme.colors.input};
    border: 2px solid ${({theme}) => theme.colors.text};

    transition: 0.325s;
    &:hover {
        box-shadow: 0 0 12px 2px ${({theme, error}) => 
            error 
            ? theme.colors.danger
            : theme.colors.effect
        };
        border: 2px solid ${({theme, error}) =>
            error 
            ? theme.colors.danger 
            : theme.colors.effect
        };
    }
`;

export const Button = styled.button`
    background-color: ${({theme}) => theme.colors.effect};
    border: none;
    
    padding: 20px;
    border-radius: 25px;

    margin-top: 20px;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: ${({theme}) => theme.colors.effect_secondary};
        box-shadow: 0 0 8px 3px ${({theme}) => theme.colors.effect_secondary};
    }
`;
