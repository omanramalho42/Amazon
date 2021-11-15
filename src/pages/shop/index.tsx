import React, { useContext } from 'react'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'

import Layout from '../../Components/Layout'
import { Store } from '../../store/Store'

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
    ButtonClose,
    Total,
    TotalContent,
    Value,
    Strong,
    IconClose,
} from './styles'

const Shop:React.FC = () => {
    const { state } = useContext(Store); 
    const { cart } = state;
    
    return(
        <Layout title="Shopping Cart" description="Cart">
            <>
                <Title>Shopping Cart</Title>
                {cart.cartItems === 0 ? (
                    <Container> 
                        <Text style={{marginBottom: 10}}>Carrinho vazio</Text>
                        <NextLink href="/" passHref>
                            <Text style={{fontWeight: 'bold'}}>Go Shopping</Text>
                        </NextLink>
                    </Container> 
                    ) : (
                    <Container>
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
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <MenuItem key={x + 1} value={x + 1}>
                                                    { x + 1 }
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Quantity>
                                    <ButtonClose>
                                        <IconClose />
                                    </ButtonClose>
                                </CardAction>   
                            </CartItem>
                        ))}
                    <Total>
                        <TotalContent>
                            <Strong>Subtotal</Strong>
                            <Value>
                                ( {cart.cartItems.reduce((a,c) => 
                                    a + c.quantity, 0
                                )}{'  '}items )
                                : R$ {cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)}
                            </Value>
                        </TotalContent>
                    </Total>
                </Container>
                )}
            </>
        </Layout>
    )
}

// export default Shop;


export default dynamic(() => Promise.resolve(Shop), {ssr: false});