import styled from "styled-components"
export const Container = styled.input`
    display: flex;
    height: 100vh;
`;

export const MapInputBox = styled.div `
    position: 'absolute';
    display: 'flex';
    left: 0;
    right: 0;
    margin: 10px auto;
    width: 300px;
    height: 600px;
`;

export const Button = styled.button`
    background-color: ${({theme}) => theme.colors.effect};
    border: none;

    z-index: 20;
    
    padding: 20px;
    border-radius: 25px;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: ${({theme}) => theme.colors.effect_secondary};
        box-shadow: 0 0 8px 3px ${({theme}) => theme.colors.effect_secondary};
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;
    
    margin: 10px;
`;

export const Input = styled.input`
    display: flex;
    border: none;

    z-index: 20;
    
    padding: 15px;
    margin: 10px;
    border-radius: 25px;
    
    background-color: ${({theme}) => theme.colors.input};
    border: 2px solid ${({theme}) => theme.colors.text};

    transition: 0.325s;

    &:hover {
        box-shadow: 0 0 12px 2px ${({theme}) => theme.colors.effect };
        border: 2px solid ${({theme}) => theme.colors.effect };  
    };
`