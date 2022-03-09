import 
    React, 
    { useContext, useEffect, useState } 
from 'react'

import NextLink from 'next/link'

import dynamic from 'next/dynamic'

import axios from 'axios'
import { useCookies } from 'react-cookie';

import { Store } from '../store/Store'

import { useRouter } from 'next/router'

import CheckoutWizzard from '../Components/CheckoutWizzard'
import { useSnackbar } from 'notistack'

import { getError } from '../utils/error';

import Layout from '../Components/Layout'

import { 
    Container, 
    Title, 
    Text, 
    CartItem,
    ContainerImage,
    Image,
    Content,
    Paragraph,
    CardAction,
    Link,
    Total,
    TotalContent,
    Value,
    Strong,
    Price,
    Cart,
    Button,
    TextButton
} from '../styles/Placeholder/styles'
import { CircularProgress, ListItem } from '@material-ui/core';

const PlaceOrder = () => {
    const router = useRouter();

    const [removeCookie] = useCookies(['cartItems']);
    const { state, dispatch } = useContext(Store); 
    const { 
        userInfo,
        cart: { cartItems, shippingAddress, payamentMethod }, 
    } = state;

    const round2 = num => Math.round(num*100 + Number.EPSILON)/100;
    const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.quantity, 0);
    const shippingPrice = itemsPrice > 200? 0: 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
    
    useEffect(() => {
        if(!payamentMethod) {
            router.push('/payament');
        }
        if(cartItems.length === 0) {
            router.push('/cart');
        }
    },[])

    const {closeSnackbar, enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        closeSnackbar();
        try {
          setLoading(true);
          const { data } = await axios.post(
            '/api/orders',
            {
              orderItems: cartItems,
              shippingAddress,
              payamentMethod,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          dispatch({ type: 'CART_CLEAR' });
          removeCookie;
          setLoading(false);
          router.push(`/order/${data._id}`);
        } catch (err) {
          setLoading(false);
          enqueueSnackbar(getError(err), { variant: 'error' });
        }
      };

    return(
        <Layout title="Shopping Cart" description="Cart">
            <CheckoutWizzard activeStep={3}/>
            <Container>
                <Title style={{textAlign: 'center'}}>Place Order</Title>
                <Cart>
                    <Title>Order Items</Title>
                    {cartItems.map((item) => (
                        <CartItem key={item._id}>
                            <ContainerImage>
                                <NextLink href={`/produto/${item.slug}`} passHref>
                                    <Link>
                                        <Image src={item.image} alt={item.name}/>
                                    </Link>
                                </NextLink>
                            </ContainerImage>
                            <Content>
                                <Text>{item.name}</Text>
                                <Paragraph>{item.description}</Paragraph>
                            </Content>
                            <Price>
                                R${item.price}
                            </Price>
                            <CardAction>
                                {item.quantity}x
                            </CardAction>   
                        </CartItem>
                    ))}
                </Cart>
                <Cart>
                    <CardAction>
                        <Title style={{fontSize: 20}}>Shipping Address</Title>
                        {shippingAddress.fullName},{' '}{shippingAddress.address},{' '}
                        {shippingAddress.city},{' '}{shippingAddress.postalCode},{' '}
                        {shippingAddress.country}
                    </CardAction>
                </Cart>
                <Cart>
                    <CardAction>
                        <Title 
                            style={{fontSize: 20}}
                        >Payament Method</Title>
                        {payamentMethod}
                    </CardAction>
                </Cart>
                <Total>
                    <TotalContent>
                        <Strong>Subtotal</Strong>
                        <Value>
                            <Text>Items</Text>
                            <Text>${itemsPrice}</Text>
                        </Value>
                        <Value>
                            <Text>Tax:</Text>
                            <Text>${taxPrice}</Text>
                        </Value>
                        <Value>
                            <Text>Shipping Price:</Text>
                            <Text>${shippingPrice}</Text>
                        </Value>
                        <Value>
                            <Text>Total Price:</Text>
                            <Text>${totalPrice}</Text>
                        </Value>
                        
                        <Button onClick={() => placeOrderHandler()}>
                            <TextButton>Place Order</TextButton>
                        </Button>

                    </TotalContent>
                </Total>
                {loading && (
                    <ListItem style={{justifyContent: 'center', marginTop: 10}}>
                        <CircularProgress />
                    </ListItem>
                )}
            </Container>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false});