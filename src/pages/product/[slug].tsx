import React, { useEffect } from 'react'
import NextLink from 'next/link'

import { useRouter } from 'next/router'

import data from '../../utils/data'
import Layout from '../../Components/Layout'

import {
    Container,
    ContainerProduct,
    ContentImage,
    ContentInfo,
    Content,
    CardBuy,
    Image,
    Text,
    Status,
    Price,
    Button,
    Return
} from './styles'

interface ProdutoProps {
    name: string,
    slug: string,
    category: string,
    image: string,
    price: number,
    brand: string,
    rating: number,
    numReviews: number,
    countInStock: number,
    description: string,
}

const Product:React.FC = () => {
    
    //INICIALIZANDO A BIBLIOTECA USEROUTER DO NEXT E ATRIBUINDO A UMA CONSTANTE
    const router = useRouter();
    //DESESTRUTURANDO O SLUG QUE É LOCALIZADO ATRAVES
    //DA QUERY DA ROUTER
    const { slug } = router.query;
    //PASSANDO UMA VARIAVEL BOOLEANA DE ACORDO COM O RESULTADO
    //DA FUNÇAO QUE COMPARA SE O SLUG DO OBJETO DE PRODUTOS É
    //IGUAL A QUERY PASSADA COMO PARAMETRO PRA URL
    const product: ProdutoProps = data.products.find((a) => a.slug === slug);
    //CASO ESSE PARAMETRO NAO ESTEJA NA LISTA DE ATRIBUTOS DO
    //OBJETO DE PRODUTOS QUE CONTEM (NAME,SLUG,IAMGE, ..., ETC)

    if(!product) {
        //ENTAO RETORNE UM AVISO QUE ESTE PRODUTO NÃO FOI ACHADO
        return <Container>Product Not found</Container>
    }
    //CASO CONTRARIO
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
                        <Text>{product.name}</Text>
                        <Text>Categoria: {product.category}</Text>
                        <Text>Brand: {product.brand}</Text>
                        <Text>
                            Raiting: {product.rating} ({product.numReviews} Reviews)
                        </Text>
                        <Text>Description: {product.description}</Text>
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
                        <Button>Add to cart</Button>
                    </CardBuy>
                </ContainerProduct>
            </Container>
        </Layout>
    );
} 

export default Product;