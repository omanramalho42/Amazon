import styled from "styled-components";

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

export const Input = styled.input`
    display: flex;
    border: none;
    
    padding: 15px;
    margin: 10px;
    border-radius: 25px;
    
    background-color: ${({theme}) => theme.colors.input};
    border: 2px solid ${({theme}) => theme.colors.text};

    &:hover {
        border: 2px solid ${({theme}) => 
            theme.colors.effect
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
    }
`;

export const Label = styled.label`
    text-align: center;
`;

export const Link = styled.a`
    text-decoration: underline;
    color: ${({theme}) => theme.colors.effect};

    &:hover {
        color: ${({theme}) => theme.colors.effect_secondary};
    }
`;
