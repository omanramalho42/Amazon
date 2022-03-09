import React, { useContext, useState } from "react"
import NextLink from 'next/link'
import { Store } from "../../store/Store"
import { 
    Container,
    Button,
    UserButton,
    Content,
    Link,
    Nav,
    Title,
    Icon,
    Badge,
    IconCart,
    Notification,
    CartContainer,
    Image
} from './styles'

import Logo from '../../assets/logo.svg'

import ModalProfile from "../_ModalProfile"

interface Props {
    theme: string;
    themeToggler: () => void;
}

const Header = ({ themeToggler, theme }: Props) => {
    // const [removeCookie] = useCookies(['cartItems']);
    const [openProfile, setOpenProfile] = useState(false);
    // const { dispatch } = useContext(Store);
    const handleOpenModal = () => {
        setOpenProfile(!openProfile);
    }

    const handleOnMouseLeave = () => {
        if(window.innerWidth < 460) {
            setOpenProfile(true);
        } else {
            setOpenProfile(false);
        }
    }
 
    const Moon = '/images/moon.png'
    const Sun = '/images/sun.png'
    const logoDark = '/images/logo.png'

    const { state } = useContext(Store);
    const { cart, userInfo } = state;

    return(
        <Container>
            <NextLink href="/" passHref>
                <Link>
                    {theme === 'dark' ? ( 
                        <Image src={logoDark} alt="Amazon"/>
                        ) : (
                            <Logo 
                                style={{
                                    width: 100, 
                                    height: 50
                                }} 
                            />
                        )}
                </Link>
            </NextLink>
            <Button 
                onClick={themeToggler} 
                active={theme}
            >
                {theme === 'light' ? 
                    <Icon src={Moon} thema={theme}/> 
                    : 
                    <Icon src={Sun} thema={theme}/>
                }
            </Button>
            <Nav>
                <Content>
                    <NextLink href="/cart" passHref>
                        {cart.cartItems.length > 0 ?
                            <CartContainer>
                                <Badge>
                                    <Notification>{cart.cartItems.length}</Notification>
                                </Badge>
                                <IconCart />
                            </CartContainer>
                            :  <Title>Cart</Title>
                        }
                    </NextLink>
                    { userInfo ? ( 
                        <UserButton
                            onClick={() => handleOpenModal()}
                            user="user"
                        >
                            <Title>
                                {userInfo.name}
                            </Title>
                        </UserButton>
                    ) : (
                        <NextLink href="/login">
                            <Title>Login</Title>
                        </NextLink>
                    )}
                    { openProfile ? (
                        <ModalProfile
                            onLeave={handleOnMouseLeave}
                            isActive={openProfile}
                        />
                    ) : (
                        <></>
                    )}
                </Content>
            </Nav>
        </Container>
    );
}

export default Header;