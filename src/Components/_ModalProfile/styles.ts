import styled from "styled-components"

export const Container = styled.div`
    z-index: 1;
    position: absolute;
 
    top: 75px;
    right: 20px;
 
    background-color: ${({theme}) => theme.colors.background};
    
    /* height: 150px; */
    width: 165px;

    border-radius: 15px;
    
    box-shadow: 0 0 12px 6px rgba(0,0,0,.3);
`;

export const Content = styled.ul`
    display: flex;
    flex-direction: column;

    padding: 10px;
`;

export const Option = styled.li`
    display: flex;
    flex-direction: row;

    cursor: pointer;

    justify-content: flex-start;

    padding: 8px;
    margin: 5px 0;

    border-radius: 8px;
    transition: 0.425s;

    &:hover {
        background-color: rgba(100, 100, 100, 0.1);
        transform: scale(1.1);
        box-shadow: 0 0 12px 3px rgba(100, 100, 100, .3);
    }
    
`;
export const Text = styled.h3`
    text-transform: uppercase;

    font-weight: 400;
    font-size: 0.9em;

    margin-left: 10px;

    color: ${({theme}) => theme.colors.text};
`;

export const Button = styled.button`
    all: unset;
    color: ${({theme}) => theme.colors.text};
`;