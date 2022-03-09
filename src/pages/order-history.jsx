import { useRouter } from 'next/router'
import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../store/Store'
import dynamic from 'next/dynamic'
import Layout from '../Components/Layout'
import NextLink from 'next/link'
import { getError } from '../utils/error'
import axios from 'axios'

import { 
    Container, 
    Title, 
    Text,
    Cart,
    Button,
} from '../styles/OrderHistory/styles'

import { 
    ListItem,
    Table, 
    TableRow,
    TableCell,
    TableBody, 
    TableHead, 
    TableContainer,
    CircularProgress
} from '@material-ui/core'

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, orders: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

const OrderHistory = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const router = useRouter();
 
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
      });
    
      useEffect(() => {
        if (!userInfo) {
          router.push('/login');
        }
        const fetchOrders = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/history`, {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
        fetchOrders();
      }, []);

    return (
    <Layout title={`Order History`} description="order history">
        {/* <ListItem style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'red'}}>
            <ListItem>
                <NextLink href='/profile'>
                    <Text>Profile</Text>
                </NextLink>
            </ListItem>
            <ListItem>
                <NextLink href={'/profile'}>
                    <Text>My history</Text>    
                </NextLink>
            </ListItem>
        </ListItem> */}
        <Container>
            <Cart style={{ padding: 10}}>
                <Title style={{textAlign: 'center'}}>Order</Title>
                {loading ? (
                <ListItem style={{justifyContent: 'center', marginTop: 10}}>
                    <CircularProgress />
                </ListItem>
                ) : error ? ( 
                    <Text style={{ textAlign: 'center'}} error={true}>
                        {error}
                    </Text>
                ) : (
                <ListItem>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Text>ID</Text></TableCell>
                                    <TableCell><Text>DATE</Text></TableCell>
                                    <TableCell><Text>TOTAL</Text></TableCell>
                                    <TableCell><Text>PAID</Text></TableCell>
                                    <TableCell><Text>DELIVERED</Text></TableCell>
                                    <TableCell><Text>ACTION</Text></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell><Text>{order._id.substring(20, 24)}</Text></TableCell>
                                    <TableCell><Text>{order.createdAt}</Text></TableCell>
                                    <TableCell><Text>${order.totalPrice}</Text></TableCell>
                                    <TableCell>
                                        <Text>
                                            {order.isPaid
                                                ? `paid at ${order.paidAt}`
                                                : 'not paid'
                                            }
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>
                                            {order.isDelivered
                                                ? `delivered at ${order.deliveredAt}`
                                                : 'not delivered'
                                            }
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <NextLink href={`/order/${order._id}`} passHref>
                                            <Button variant="contained">Details</Button>
                                        </NextLink>
                                    </TableCell>
                                </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ListItem>
                )}
            </Cart>
            {loading && (
            <ListItem style={{justifyContent: 'center', marginTop: 10}}>
                <CircularProgress />
            </ListItem>
            )}
        </Container>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(OrderHistory), {ssr: false});