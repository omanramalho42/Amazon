import React from "react";
import { Container, Title } from './styles'
import Logo from '../../assets/logo.svg';

const Header:React.FC = () => {
    return(
        <Container>
            <Logo style={{width: 100}}/>
            {/* <Title>Amazon</Title> */}
        </Container>
    );
}

export default Header;