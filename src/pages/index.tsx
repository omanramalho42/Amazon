import Head from 'next/head'
import NextLink from 'next/link'

import Layout from '../Components/Layout'
import CardMedia from '../Components/CardMedia';

import data from '../utils/data';

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
} from '../styles/Home/home';

const Home:React.FC = () => {

  const dataItems = data;

  return (
    <div>
      <main>
        <Layout title="HomePage" description="Home">
          <div>
            <Welcome>Products</Welcome>
            <GridContainer>
                {dataItems.products.map((item, index) => (
                  <Grid key={index}>
                    <Card>
                      <NextLink href={`/product/${item.slug}`} passHref>
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