import React, { useContext } from "react"
import NextLink from 'next/link'

import { Store } from "../../store/Store"

import { 
    Container,
    Button,
    Link,
    Nav,
    Title,
    Icon,
    Badge,
    Notification
} from './styles'

import Logo from '../../assets/logo.svg'

interface Props {
    theme: string;
    themeToggler: () => void;
}

const Header = ({ themeToggler, theme }: Props) => {
    const Moon = '/images/moon.png'
    const Sun = '/images/sun.png'

    const { state, dispatch } = useContext(Store)
    const { cart } = state; 

    return(
        <Container>
            <NextLink href="/" passHref>
                <Link>
                    <Logo style={{width: 100, height: 50}}/>
                </Link>
            </NextLink>
            <Button onClick={themeToggler} >
                {theme === 'light' ? 
                    <Icon src={Moon} thema={theme}/> 
                    : 
                    <Icon src={Sun} thema={theme}/>
                }
            </Button>
            <Nav>
                <NextLink href="/shop" passHref>
                    {cart.cartItems.length > 0 ?
                        <Badge>
                            <Notification>{cart.cartItems.length}</Notification>
                        </Badge>
                        :  <Title>Cart</Title>
                    }
                </NextLink>
                <NextLink href="/login">
                    <Title>Login</Title>
                </NextLink>
            </Nav>
        </Container>
    );
}

export default Header;