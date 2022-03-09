import React, { useContext, useState } from "react"
import { FiSettings, FiLogOut, FiUser } from 'react-icons/fi';

import { Store } from "../../store/Store";
import Cookies from 'js-cookie';

import  { useRouter } from "next/router";

import { Container, Content, Option, Text, Button } from './styles'

interface Props {
    isActive: boolean;
    onLeave: () => void;
}

const ModalProfile = ({isActive, onLeave}: Props) => {
    const { dispatch } = useContext(Store);
    const router = useRouter();
    
    const [anchorEl, setAnchorEl] = useState(null);

    const loginClickHandler = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const loginMenuCloseHandler = (e, redirect) => {
      setAnchorEl(null);
      if (redirect) {
        router.push(redirect);
      }
    };
    const logoutClickHandler = () => {
      setAnchorEl(null);
      dispatch({ type: 'USER_LOGOUT' });
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('shippinhAddress');
      Cookies.remove('paymentMethod');
      router.push('/');
    };

    return (
        <Container 
            onMouseLeave={() => onLeave()
        }>
            <Content>
                {isActive ? (
                    <>
                        <Option>
                            <Button onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
                                <FiSettings />
                            </Button>
                            <Text>Profile</Text>
                        </Option>
                        <Option>
                            <Button onClick={(e) => loginMenuCloseHandler(e, '/order-history')}>
                                <FiSettings />
                            </Button>
                            <Text>History Order</Text>
                        </Option>
                        <Option onClick={(e) => loginClickHandler(e)}>
                            <Button>
                                <FiUser />
                            </Button>
                            <Text>My Account</Text>
                        </Option>
                        <Option
                            onClick={() => logoutClickHandler()}
                        >
                            <Button>
                                <FiLogOut />
                            </Button>
                            <Text>Logout</Text>
                        </Option>
                    </>
                ) : (<></>)}
            </Content>
        </Container>
    )
}

export default ModalProfile;