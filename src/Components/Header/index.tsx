import React from "react"
import NextLink from 'next/link';

import { 
    Container,
    Button,
    Link,
    Nav,
    Title,
    Icon
} from './styles'

import Logo from '../../assets/logo.svg'

interface Props {
    theme: string;
    themeToggler: () => void;
}

const Header = ({ themeToggler, theme }: Props) => {
    const Moon = '/images/moon.png'
    const Sun = '/images/sun.png'

    return(
        <Container>
            <NextLink href="/" passHref>
                <Link>
                    <Logo style={{width: 100}}/>
                </Link>
            </NextLink>
            <Button onClick={themeToggler} >
                {theme === 'light' ? <Icon src={Moon} thema={theme}/> : <Icon src={Sun} thema={theme}/>}
            </Button>
            <Nav>
                <NextLink href="/cart">
                    <Title>Cart</Title>
                </NextLink>
                <NextLink href="/login">
                    <Title>Login</Title>
                </NextLink>
            </Nav>
        </Container>
    );
}

export default Header;