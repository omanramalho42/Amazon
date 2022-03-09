import 
    React, 
    { useContext, useEffect, useReducer } 
from 'react'

import NextLink from 'next/link'

import dynamic from 'next/dynamic'

import axios from 'axios'

import { Store } from '../../store/Store'

import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import CheckoutWizzard from '../../Components/CheckoutWizzard'

import { getError } from '../../utils/error'

import { PayPalButtons } from '@paypal/react-paypal-js'

import { usePayPalScriptReducer } from '@paypal/react-paypal-js'

import Layout from '../../Components/Layout'

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
} from '../../styles/Order/styles'
import { CircularProgress, ListItem } from '@material-ui/core'

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_REQUEST': 
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS' :
            return { ...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAIL': 
            return { ...state, loading: false, error: action.payload }
        case 'PAY_REQUEST': 
            return { ...state, loadingPay: true }
        case 'PAY_SUCCESS' :
            return { ...state, loadingPay: false, successPay: true }
        case 'PAY_FAIL': 
            return { ...state, loadingPay: false, errorPay: action.payload }
        case 'PAY_RESET': 
            return { ...state, loadingPay: false, successPay: false, errorPay: '' }
        case 'DELIVER_REQUEST':
            return { ...state, loadingDeliver: true };
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false, errorDeliver: action.payload };
        case 'DELIVER_RESET':
            return {
                ...state,
                loadingDeliver: false,
                successDeliver: false,
                errorDeliver: '',
            };
        default: 
            state;
    }
}

const Order = ({ params }) => {
    const orderId = params.id;
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const router = useRouter();
    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, order, successPay, loadingDeliver, successDeliver }, dispatch] = useReducer(reducer, {
        loading: true, 
        order: {}, 
        error: ''
    });

    const { 
      shippingAddress,
      payamentMethod,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    } = order;

    useEffect(() => {
        if (!userInfo) {
          return router.push('/login');
        }
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/${orderId}`, {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
        if (
          !order._id ||
          successPay ||
          successDeliver ||
          (order._id && order._id !== orderId)
        ) {
          fetchOrder();
          if (successPay) {
            dispatch({ type: 'PAY_RESET' });
          }
          if (successDeliver) {
            dispatch({ type: 'DELIVER_RESET' });
          }
        } else {
          const loadPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/keys/paypal', {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': clientId,
                currency: 'BRL',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          };
          loadPaypalScript();
        }
      }, [order, successPay, successDeliver]);

    const { enqueueSnackbar } = useSnackbar();

    function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            dispatch({ type: 'PAY_REQUEST' });
            const { data } = await axios.put(
              `/api/orders/${order._id}/pay`,
              details,
              {
                headers: { authorization: `Bearer ${userInfo.token}` },
              }
            );
            dispatch({ type: 'PAY_SUCCESS', payload: data });
            enqueueSnackbar('Order is paid', { variant: 'success' });
          } catch (err) {
            dispatch({ type: 'PAY_FAIL', payload: getError(err) });
            enqueueSnackbar(getError(err), { variant: 'error' });
          }
        });
      }
    
      function onError(err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
      }

    async function deliverOrderHandler() {
        try {
          dispatch({ type: 'DELIVER_REQUEST' });
          const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          dispatch({ type: 'DELIVER_SUCCESS', payload: data });
          enqueueSnackbar('Order is delivered', { variant: 'success' });
        } catch (err) {
          dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
          enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }

    return(
        <Layout title={`Order ${orderId}`} description="Cart">
            <CheckoutWizzard activeStep={3} />
            <Title style={{textAlign: 'center'}}>Order ${orderId}</Title>
            {loading ? (
                <ListItem style={{justifyContent: 'center', marginTop: 10}}>
                    <CircularProgress />
                </ListItem>
                ) : error ? ( 
                    <Text style={{ textAlign: 'center'}} error={true}>
                        {error}
                    </Text>
                ) : (
                    <Container>
                        <Cart>
                            {orderItems?.map((item) => (
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
                            <CardAction>
                                <Title style={{fontSize: 20}}>
                                    Status:{' '} 
                                    {isDelivered 
                                        ? `Delivered at ${deliveredAt}` 
                                        : "Not delivered"
                                    }
                                </Title>
                                
                            </CardAction>
                        </Cart>
                        <Cart>
                            <CardAction>
                                <Title 
                                    style={{fontSize: 20}}
                                >Payament Method</Title>
                                {payamentMethod}
                            </CardAction>
                            <Title style={{fontSize: 20}}>
                                    Status:{' '} 
                                    {isPaid 
                                        ? `Paid at ${paidAt}` 
                                        : "Not paid"
                                    }
                                </Title>
                                
                        </Cart>
                        <Total>
                            <TotalContent>
                                <Strong>Subtotal</Strong>
                                <Value>
                                    <Text>Items</Text>
                                    <Text>{orderItems.length}</Text>
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
                                {!isPaid && (
                                    <ListItem>
                                        {isPending ? (
                                            <ListItem style={{justifyContent: 'center', marginTop: 10}}>
                                                <CircularProgress />
                                            </ListItem>
                                        ) : (
                                            <ListItem style={{ margin: 'auto', justifyContent: 'center' }}>
                                                <PayPalButtons 
                                                    createOrder={createOrder} 
                                                    onApprove={onApprove} 
                                                    onError={onError}
                                                >
                                                </PayPalButtons>
                                            </ListItem>
                                        )}
                                    </ListItem>
                                )}
                                
                                <ListItem style={{ justifyContent: 'center' }}>
                                  {loadingDeliver && <CircularProgress />}
                                  <Button
                                    onClick={deliverOrderHandler}
                                  >
                                   Deliver Order
                                  </Button>
                              </ListItem>

                            </TotalContent>
                        </Total>
                        {loading && (
                            <ListItem style={{justifyContent: 'center', marginTop: 10}}>
                                <CircularProgress />
                            </ListItem>
                        )}
                    </Container>
            )}
        </Layout>
    )
}

// export async function getServerSideProps({ params }) {
//   return { props: { params } };
// }
export default dynamic(() => Promise.resolve(Order), { ssr: false });