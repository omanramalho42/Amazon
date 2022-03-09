import React, { useContext, useEffect } from "react"

import { useRouter } from "next/router"

import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { setCookie } from 'react-use-cookie';
import CheckoutWizzard from "../Components/CheckoutWizzard"

import { useForm, Controller } from 'react-hook-form'

import { Store } from "../store/Store"
import dynamic from "next/dynamic";
import Layout from "../Components/Layout"

import { 
    Container,
    Title,
    Content,
    Form,
    Input,
    Button,
    Text
} from '../styles/Shipping/styles'

import {
    ListItem,
  } from '@material-ui/core';

function Shipping() {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
      } = useForm();

    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    
    const { 
        userInfo, 
        cart: {
            shippingAddress
        }
    } = state;
    const { location } = shippingAddress;
    
    useEffect(() => {
        if(!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    },[]);
    
    // const [setCookie] = useCookies(['shippingAddress']);

    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: { fullName, address, city, postalCode, country, location },
        });
        setCookie('shippingAddress',{
            fullName,
            address,
            city,
            postalCode,
            country,
            location,
          });
        router.push('/payament');
      };
    
    const chooseLocationHandler = () => {
        const fullName = getValues('fullName');
        const address = getValues('address');
        const city = getValues('city');
        const postalCode = getValues('postalCode');
        const country = getValues('country');
        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: { fullName, address, city, postalCode, country },
        });
        Cookies.set('shippingAddress', {
          fullName,
          address,
          city,
          postalCode,
          country,
          location,
        });
        router.push('/map');
    };

    return(
        <Layout title="shipping address" description="Shipping">
            <CheckoutWizzard activeStep={1} />
            <Container>
                <Title>Shipping address</Title>
                <Content>
                    <Form onSubmit={handleSubmit(submitHandler)}>

                        <Controller
                            control={control}
                            name="fullName"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.fullName)}
                                        id="fullName"
                                        placeholder="Insira seu nome completo"
                                        type="text"
                                        {...field}
                                    />
                                    {errors.fullName? 
                                        errors.fullName.type === 'minLength'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >Full Name is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                Full Name is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                        /> 
                        <Controller
                            control={control}
                            name="address"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.address)}
                                        id="address"
                                        placeholder="Insira seu endereço"
                                        type="text"
                                        {...field}
                                    />
                                    {errors.address? 
                                        errors.address.type === 'minLength'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >Address is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                Address is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                        /> 
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.city)}
                                        id="city"
                                        placeholder="Insira sua cidade"
                                        type="text"
                                        {...field}
                                    />
                                    {errors.city? 
                                        errors.city.type === 'minLength'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >City is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                City is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                        /> 
                        <Controller
                            control={control}
                            name="postalCode"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.postalCode)}
                                        id="postalCode"
                                        placeholder="Insira seu postal code"
                                        type="text"
                                        {...field}
                                    />
                                    {errors.postalCode? 
                                        errors.postalCode.type === 'minLength'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >Postal Code is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                Postal Code is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                        /> 
                        <Controller
                            control={control}
                            name="country"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.country)}
                                        id="country"
                                        placeholder="Insira seu país"
                                        type="text"
                                        {...field}
                                    />
                                    {errors.country? 
                                        errors.country.type === 'minLength'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >Country is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                Country is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                        /> 
                         <ListItem style={{ justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                type="button"
                                onClick={chooseLocationHandler}
                            >
                                Choose on map
                            </Button>
                            <Text>
                                {location?.lat && `${location?.lat}, ${location?.lat}`}
                            </Text>
                        </ListItem>
                        <ListItem style={{ justifyContent: 'center' }}>
                            <Button
                                type="submit" 
                                onClick={() => submitHandler}
                            >
                                <Text style={{ 
                                    color: '#000',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontFamily: "Montserrat"
                                }}>
                                    Continue
                                </Text>
                            </Button>
                        </ListItem>
                    </Form>
                </Content>
            </Container>
        </Layout>
    )
}

// Shipping.getInitialProps = async () => {
//     return {  }
// }
// export default Shipping;
export default dynamic(() => Promise.resolve(Shipping), {ssr: false});