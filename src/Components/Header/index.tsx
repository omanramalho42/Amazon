import React from "react"
import NextLink from 'next/link';

import { Container, Link } from './styles'
import Logo from '../../assets/logo.svg';

const Header:React.FC = () => {
    return(
        <Container>
            <NextLink href="/" passHref>
                <Link href="/">
                    <Logo style={{width: 100}}/>
                </Link>
            </NextLink>
            {/* <Title>Amazon</Title> */}
        </Container>
    );
}

export default Header;