import React from 'react'

import { GetServerSideProps } from 'next'
import NextLink from 'next/link'

import db from '../utils/db'
import Product from '../../models/Product'

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
  // const { products } = props;

  return (
    <div>
      <main>
        <Layout title="HomePage" description="Home">
          <div>
            <Welcome>Products</Welcome>
            <GridContainer>
                {products.map((item, index) => (
                  <Grid key={index}>
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
                            <Button>Buy Now</Button>
                          </CardActions>
                        </CardActionArea>
                      </NextLink>
                    </Card>
                  </Grid>
                ))}
            </GridContainer>
          </div>
        </Layout>
      </main>
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }
}