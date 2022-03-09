import React, { useContext } from 'react'

import NextLink from 'next/link'
import dynamic from 'next/dynamic'

import axios from 'axios'
import router from 'next/router'

import { Store } from '../store/Store'

import Layout from '../Components/Layout'

import { Select, MenuItem } from '@material-ui/core';

import { 
    Container, 
    Title, 
    Text, 
    CartItem,
    ContainerImage,
    Image,
    Content,
    Paragraph,
    Raiting,
    CardAction,
    Quantity,
    Link,
    ContentInfo,
    ButtonClose,
    Total,
    TotalContent,
    Value,
    Strong,
    IconClose,
    TextLink,
    Button
} from '../styles/Shop/styles'

const Shop = () => {
    const { state, dispatch } = useContext(Store); 
    const { cart } = state;
    
    const handleUpdateCart = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`)
        if(data.countInStock <= 0) {
            window.alert('Sorry. Product is out of stock');
            return
        }
        if(data.countInStock < quantity) {
            window.alert('Sorry. Product is max of stock');
            return
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: {...item, quantity } })
    }

    const handleRemoveItem = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }

    const handleChecked = () => {
        router.push('/shipping');
    }

    return(
        <Layout title="Shopping Cart" description="Cart">
            <Container>
                <Title>Shopping Cart</Title>
                {cart.cartItems === 0 ? (
                    <ContentInfo>
                        <Text style={{marginBottom: 10}}>Carrinho vazio</Text>
                        <NextLink href="/" passHref>
                            <Link>
                                <TextLink>Go Shopping</TextLink>
                            </Link>
                        </NextLink>
                    </ContentInfo>
 
                    ) : (
                    <>
                        {cart.cartItems.map((item) => (
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
                                <Raiting>{item.rating}</Raiting>
                                <CardAction>
                                    <Quantity>
                                        <Select 
                                            value={item.quantity}
                                            style={{ marginTop: 20}}
                                            onChange={(e) => handleUpdateCart(item, e.target.value)}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <MenuItem key={x + 1} value={x + 1}>
                                                    { x + 1 }
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Quantity>
                                    <ButtonClose onClick={() => handleRemoveItem(item)}>
                                        <IconClose />
                                    </ButtonClose>
                                </CardAction>   
                            </CartItem>
                        ))}
                    <Total>
                        <TotalContent>
                            <Strong>Subtotal</Strong>
                            <Button onClick={handleChecked}>Payament</Button>
                            <Value>
                                ( {cart.cartItems.reduce((a,c) => 
                                    a + c.quantity, 0
                                )}{'  '}items )
                                : R$ {cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)}
                            </Value>
                        </TotalContent>
                    </Total>
                </>
                )}
            </Container>
        </Layout>
    )
}

// export default Shop;


export default dynamic(() => Promise.resolve(Shop), {ssr: false});