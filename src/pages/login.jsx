import React, { useContext, useEffect } from "react"

import NextLink from 'next/link'
import { useRouter } from "next/router"
import axios from 'axios'
import Cookies from 'js-cookie';
import { setCookie } from 'react-use-cookie';
import dynamic from "next/dynamic"
import { Controller, useForm } from 'react-hook-form'
import { getError } from "../utils/error"
import { Store } from "../store/Store"

import { useSnackbar } from 'notistack'

import Layout from "../Components/Layout"

import { 
    Container,
    Title,
    Content,
    Form,
    Input,
    Button,
    Label,
    Link,
    Text
} from '../styles/Login/styles'

export default function Login() {
    const router = useRouter();
    const { redirect } = router.query

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const { 
        handleSubmit, 
        control, 
        formState: {errors}
    } = useForm();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    // const [setCookie] = useCookies(['userInfo']);
    
    useEffect(() => {
        if(userInfo) {
            redirect
                ? router.push('/shipping') 
                : router.push('/');
        }    
    },[userInfo]);

    const handleSubmitForm = async ({email, password}) => { 
        closeSnackbar();
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password
            });
            dispatch({type: 'USER_LOGIN', payload: data});
            // Cookies.set('userInfo', data);
            setCookie('userInfo', data);
            router.push(redirect[0]);
        } catch(err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    }
    
    return(
        <Layout title="login" description="login">
            <Container>
                <Title>Login</Title>
                <Content>
                    <Form onSubmit={handleSubmit(handleSubmitForm)}>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.email)}
                                        id="email"
                                        placeholder="Insira seu Email"
                                        type="email"
                                        {...field}
                                    />
                                    {errors.email? 
                                        errors.email.type === 'pattern'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >Email is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                Email is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                         />
                         <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({field}) =>  
                                (<>
                                    <Input
                                        id="password"
                                        error={Boolean(errors.password)}
                                        placeholder="Insira sua senha"
                                        type="password"
                                        {...field}
                                    />
                                    {errors.password?
                                        errors.password.type === 'minLength'
                                        ? ( 
                                            <span style={{
                                                    padding: 5, 
                                                    color: 'red',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Password is then more 5
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                    padding: 5,
                                                    textAlign: 'center',
                                                    color: 'red',
                                                }}
                                            >
                                                Password is required
                                            </span> 
                                        ) : ('') 
                                    }
                                </> 
                                )
                            }
                         />            
                        <Button
                            type="submit" 
                            onClick={() => handleSubmitForm}
                        >
                            <Text style={{ 
                                color: '#000',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontFamily: "Montserrat"
                            }}>
                                Login
                            </Text>
                        </Button>
                    </Form>
                </Content>
                <Label>
                    <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                        <Text>
                            Ainda nao possui uma conta?
                            <Link> Register</Link>
                        </Text>
                    </NextLink>
                </Label>
            </Container>
        </Layout>
    )
}

// export default dynamic(() => Promise.resolve(Login), {ssr: false});