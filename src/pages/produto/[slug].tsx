import React, { useContext } from "react"

import NextLink from 'next/link'
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router"

import axios from 'axios'
import { Store } from '../../store/Store'
import Product from '../../../models/Product'
import db from '../../utils/db'

// import data from '../../utils/data'
// import { useRouter } from 'next/router'

import Layout from '../../Components/Layout'

import {
    Container,
    ContainerProduct,
    ContentImage,
    ContentInfo,
    Content,
    CardBuy,
    Image,
    TextInfo,
    Text,
    Status,
    Price,
    Button,
    Return
} from './styles'

const Produto = ({ product }) => {
    const router = useRouter();    
    //INICIALIZANDO A BIBLIOTECA USEROUTER DO NEXT E ATRIBUINDO A UMA CONSTANTE
   // const router = useRouter();
    //DESESTRUTURANDO O SLUG QUE É LOCALIZADO ATRAVES
    //DA QUERY DA ROUTER
   // const { slug } = router.query;
    //PASSANDO UMA VARIAVEL BOOLEANA DE ACORDO COM O RESULTADO
    //DA FUNÇAO QUE COMPARA SE O SLUG DO OBJETO DE PRODUTOS É
    //IGUAL A QUERY PASSADA COMO PARAMETRO PRA URL
   // const product: ProdutoProps = data.products.find((a) => a.slug === slug);
    //CASO ESSE PARAMETRO NAO ESTEJA NA LISTA DE ATRIBUTOS DO
    //OBJETO DE PRODUTOS QUE CONTEM (NAME,SLUG,IAMGE, ..., ETC)
    
    if(!product) {
        //ENTAO RETORNE UM AVISO QUE ESTE PRODUTO NÃO FOI ACHADO
        return <Container>Product Not found</Container>
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state, dispatch } = useContext(Store);

    const handleAddCart = async () => {
        const { data } = await axios.get(`/api/products/${product._id}`)
        if(data.countInStock <= 0) {
            window.alert('Sorry. Product is out of stock');
            return
        }
        const existItem = state.cart.cartItems.find(x => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if(data.countInStock < quantity) {
            window.alert('Sorry. Product is max of stock');
            return
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity } })
        router.push('/shop');
    }
    return(
        //RETORNE A RENDERIZAÇÃO DA PÁGINA DE VISUALIZAÇÃO DO ITEM ESPECIFICO
        <Layout 
            title={product.name}
            description={product.description}
        >
            <Container>
                <NextLink href="/" passHref>
                    <Return>Voltar para home</Return>
                </NextLink>
                <ContainerProduct>
                    <ContentImage>
                        <Image 
                            src={product.image}
                            alt={product.name}
                        />
                    </ContentImage>
                    <ContentInfo>
                        <TextInfo>{product.name}</TextInfo>
                        <TextInfo>Categoria: {product.category}</TextInfo>
                        <TextInfo>Brand: {product.brand}</TextInfo>
                        <TextInfo>
                            Raiting: {product.rating} ({product.numReviews} Reviews)
                        </TextInfo>
                        <TextInfo>Description: {product.description}</TextInfo>
                    </ContentInfo>
                    <CardBuy>
                        <Content>
                            <Status>
                                <Text>Price</Text>
                                <Text>{product.price}</Text>
                            </Status>
                            <Price>
                                <Text>Status</Text>
                                {product.countInStock === 0 ? ( 
                                        <Text>Esgotado</Text>
                                    ) : (
                                        <Text>Em estoque</Text>
                                    )}
                                
                            </Price>
                        </Content>
                        <Button onClick={handleAddCart}>Add to cart</Button>
                    </CardBuy>
                </ContainerProduct>
            </Container>
        </Layout>
    );
} 

export default Produto;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    const { slug } = params
    
    await db.connect();
    const product = await Product.findOne({slug}).lean();
    await db.disconnect();
  
    return {
      props: {
        product: db.convertDocToObj(product),
      }
    }
  }