import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useCookies } from 'react-cookie'
import { useSnackbar } from "notistack"
import { Store } from "../store/Store"
import Layout from "../Components/Layout"
import CheckoutWizzard from "../Components/CheckoutWizzard"
import dynamic from 'next/dynamic'

import { setCookie, getCookie } from 'react-use-cookie';

import { AiOutlineCheck as Check} from 'react-icons/ai'

import { 
    Container, 
    Content, 
    CheckBox, 
    ListItem,
    Item, 
    Label, 
    Button, 
    Title, 
    Titleback 
} from '../styles/Payament/styles'

export default function Payament() {
    
    const router  = useRouter();
    const [payamentMethod, setPayamentMethod] = useState('');
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const {state, dispatch} = useContext(Store);
    const { 
        cart: { 
            shippingAddress 
        } 
    } = state;
    
    const [cookies] = useCookies(['shippingAddress']);
    const [cookie, setCookie] = useCookies(['payamentMethod']);

    const [check, setCheck] = useState([
        {id: 0, name: 'paypal', status: false},
        {id: 1, name: 'stripe', status: false},
        {id: 2, name: 'cash', status: false}
    ]);

    // useEffect(() => {
    //     if(!shippingAddress.address) {
    //         router.push('/shipping');
    //     } else {
    //         setPaymentMethod(Cookies.get('paymentMethod') || '');
    //     }
    // },[])

    useEffect(() => {
        try {
            check.map(item => 
                item.name === cookie.payamentMethod
                ? setCheck(check.map(item => {
                    if(item.name === cookie.payamentMethod){    
                        return {
                            id: item.id,
                            name: item.name,
                            status: true,
                        }
                    }else {
                        return {
                            id: item.id,
                            name: item.name,
                            status: false,
                        }
                    }
                })) : null
            )
        } catch(err) {
            console.log(err.message);
        }

        if(!cookies) {
            router.push('/shipping');
        } else {
            setPayamentMethod(cookie.payamentMethod || '');
        }
    },[]);
    
    const handleChange = (e, data) => {
        setPayamentMethod(e.target.value);
        //MARCAR COMO CHECK APENAS UMA OPÇAO POR VEZ 
        setCheck(check.map(item => {
            //MARQUE APENAS UMA OPÇAO POR VEZ
            if(item.status){
                item.status = false;
            }
            //CASO O ID DO ITEM SELECIONADO SEJA IGUAL
            //AO INDICE DO ITEM ENTAO
            if(data === item.id) {
                //SETE TRUE PARA O STATUS  
                item.status = true;
            }
            //RETORNE O ITEM
            return item;
        }));

        console.log("state after change: ");
        console.log(check);
    }

    const handleSubmit = (e) => {
        closeSnackbar();
        e.preventDefault();
        if(!payamentMethod) {
            enqueueSnackbar('Payament method is required', {variant: 'error'});
        } else {
            dispatch({type: 'SAVE_PAYAMENT_METHOD', payload: payamentMethod});
            setCookie('payamentMethod', payamentMethod);
            router.push('/placeorder');
        }
    };
    
    return ( 
        <Layout title="Payment" description="Payament Method">
            <CheckoutWizzard activeStep={2} />
            <Title>Payament Method</Title>
            <Container onSubmit={handleSubmit}>
                <Content>
                    <ListItem>
                        {check.map((item, index) => 
                            <Item key={index}>
                                <Label>{item.name}</Label>
                                {!item.status? ( 
                                    <CheckBox
                                        checked={item.status}
                                        type="checkbox"
                                        value={item.name}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                ) : (
                                    <Check
                                        onClick={() => setCheck(
                                            check.map(data => {
                                                if(item.id === data.id) {
                                                    data.status = false;
                                                }
                                                return data;
                                        }))}
                                        size={22} 
                                        color="green"
                                    />
                                )}
                            </Item>
                        )}
                    </ListItem>
                    <Button 
                        type="submit" 
                        onSubmit={handleSubmit}
                    >
                        Continuar
                    </Button>
                    <Titleback             
                        onClick={() => (router.push('/shipping'))}
                    >
                        Back
                    </Titleback>
                </Content>
            </Container>
        </Layout>
    );
}

// export default Payament;
// export default dynamic(() => Promise.resolve(Payament), {ssr: false});