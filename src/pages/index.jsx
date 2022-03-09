import React, { useContext } from 'react'
import NextLink from 'next/link'

import axios from 'axios'

import db from '../utils/db'
import Product from '../../models/Product'

import { Store } from '../store/Store'
import { useRouter } from 'next/router'

import Layout from '../Components/Layout'
import CardMedia from '../Components/CardMedia'

import { 
  GridContainer,
  Grid,
  Card, 
  CardActionArea,
  CardContent,
  CardActions,
  Title,
  Button,
  Welcome,
} from '../styles/Home/home'

const Home = ({ products }) => {
  const { state, dispatch } = useContext(Store); 
  const router = useRouter();

  const handleAddCart = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`)
    
    if(data.countInStock <= 0) {
        window.alert('Sorry. Product is out of stock');
    }
    
    const existItem = state.cart.cartItems.find(x => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if(data.countInStock < quantity) {
        window.alert('Sorry. Product is max of stock');
        return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity } })
    router.push('/cart');
  }
  return (
    <>
      <>
        <Layout title="HomePage" description="Home">
          <>
            <Welcome>Products</Welcome>
            <GridContainer>
                {products.map((item, index) => (
                  <Grid 
                    key={index}
                  >
                    <Card>
                      <NextLink href={`/produto/${item.slug}`} passHref>
                        <CardActionArea>
                          <CardMedia 
                            title={item.name}
                            image={item.image}
                          />
                          <CardContent>
                            <Title>{item.name}</Title>
                          </CardContent>
                          <CardActions>
                            <Title>${item.price}</Title>
                            <Button onClick={() => handleAddCart(item)}>Buy Now</Button>
                          </CardActions>
                        </CardActionArea>
                      </NextLink>
                    </Card>
                  </Grid>
                ))}
            </GridContainer>
          </>
        </Layout>
      </>
    </>
  )
}

export default Home;

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }
}