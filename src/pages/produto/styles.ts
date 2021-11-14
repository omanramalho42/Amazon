import styled from "styled-components";

export const Container = styled.div`
    h3 {
        margin-left: 90px;
    }
`;

export const ContainerProduct = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1;
    
    padding: 20px 100px;
    align-items: center;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        padding:0 70px;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        padding:0 50px;
    }
`;

export const Return = styled.h3`
    padding: 10px;
    cursor: pointer;
    color: ${({theme}) => theme.colors.text};
`;

export const ContentImage = styled.div`
    display: flex;
    width: 640px;
    min-width: 400px;

    @media screen and (max-width: 1000px) {
        grid-column-start: 1;
        grid-column-end: 2;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        padding:0 50px;
    }
`;

export const ContentInfo = styled.div`
    flex: 1;
    margin-left: 20px;

    @media screen and (max-width: 1000px) {
        grid-column-start: 1;
        grid-row-start: 2;
    }

    @media screen and (max-width: 600px) {
        grid-column-start: 1;
        grid-row-start: 2;
        grid-template-columns: 1fr;

        padding: 0 30px;
    }
`;

export const Content = styled.div`

`;

export const CardBuy = styled.div`
    width: 250px;
    height: 150px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0 ,0.2);
    
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;

    background-color: ${({theme}) => theme.colors.primary};

    @media screen and (max-width: 1000px) {
        margin-top: 20px;
        grid-column-start: 1;
        grid-row-start: 2;
        position: relative;
        left: 370px;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
`;

export const TextInfo = styled.h4`
    font-size: 1em;
    font-weight: 400;
    color: ${({theme}) => theme.colors.text};
    padding: 10px;
`;

export const Text = styled.h4`
    padding: 5px;
    color: ${({theme}) => theme.colors.text};
`;

export const Status = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Price = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Button = styled.button`
    width: 100%;
    margin-top: 15px;

    border: none;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.effect};
    
    text-align: center;
    padding: 15px;

    transition: 0.2s;

    &:hover {
        background-color: ${({theme}) => theme.colors.effect_secondary};
    }
`;
