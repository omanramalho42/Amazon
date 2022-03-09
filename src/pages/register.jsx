import React, { useContext, useEffect } from "react"

import NextLink from 'next/link'
import { useRouter } from "next/router"
import axios from 'axios'
import { getError } from "../utils/error"
import { useSnackbar } from "notistack"
import { useForm, Controller } from 'react-hook-form'
import dynamic from "next/dynamic"
import { Store } from "../store/Store"
import Cookies from 'js-cookie'

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
} from '../styles/Register/styles'

export default function Register() {

    const { 
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); 

    const router = useRouter();
    const { redirect } = router.query; //login?redirect=/shipping

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    
    useEffect(() => {
        if(userInfo) {
            router.push('/');
        }    
    },[userInfo])

    const handleSubmitForm = async ({name, email, password, confirmPassword}) => {
        console.log("handle submit register: "+name+email+password)
        closeSnackbar();
        if( password !== confirmPassword) {
            enqueueSnackbar("password don't match ", { variant: 'error'});
            return;
        }
        try {
            const { data } = await axios.post('/api/users/register', {
                name,
                email,
                password,
            });
            dispatch({type: 'USER_LOGIN', payload: data});
            Cookies.set('userInfo', data);
            router.push(redirect[0] || '/');
        } catch(err) {
            enqueueSnackbar(getError(err), { variant: 'error' });
        }
    };
    
    return(
        <Layout title="register" description="register">
            <Container>
                <Title>Register</Title>
                <Content>
                    <Form onSubmit={handleSubmit(handleSubmitForm)}>

                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 4,
                            }}
                            render={({field}) =>  
                                (<> 
                                    <Input
                                        error={Boolean(errors.name)}
                                        id="nome"
                                        placeholder="Insira seu nome"
                                        type="nome"
                                        {...field}
                                    />
                                    {errors.name? 
                                        errors.name.type === 'minLength'
                                        ? ( 
                                            <span 
                                                style={{
                                                    padding: 5,
                                                    textAlign: 'center', 
                                                    color: 'red'
                                                }}
                                                >Name is not valid
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                padding: 5,
                                                textAlign: 'center',
                                                color: 'red'
                                                }}
                                            >
                                                Nome is Required
                                            </span> 
                                        ) : ('') 
                                    } 
                                </> )
                            }
                        /> 
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
                        <Controller
                            control={control}
                            name="confirmPassword"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({field}) =>  
                                (<>
                                    <Input
                                        id="confirmPassword"
                                        error={Boolean(errors.confirmPassword)}
                                        placeholder="Insira sua senha novamente"
                                        type="password"
                                        {...field}
                                    />
                                    {errors.confirmPassword?
                                        errors.confirmPassword.type === 'minLength'
                                        ? ( 
                                            <span style={{
                                                    padding: 5, 
                                                    color: 'red',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Confirm Password is then more 5
                                            </span> 
                                        ) 
                                        : ( 
                                            <span style={{
                                                    padding: 5,
                                                    textAlign: 'center',
                                                    color: 'red',
                                                }}
                                            >
                                                Confirm Password is required
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
                                Register
                            </Text>
                        </Button>
                    </Form>
                </Content>
                <Label>
                    <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                        <Text>
                            Já possuí uma conta?
                            <Link>Login</Link>
                        </Text>
                    </NextLink>
                </Label>
            </Container>
        </Layout>
    )
}

// Register.getInitialProps = async () => {
//     return {  }
// }

// export default Register;
// export default dynamic(() => Promise.resolve(Register), {ssr: false});