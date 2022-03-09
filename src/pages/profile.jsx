
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Store } from '../store/Store'
import dynamic from 'next/dynamic'
import NextLink from 'next/link';
import Layout from '../Components/Layout'
import { useSnackbar } from "notistack"
import { useForm, Controller } from 'react-hook-form'
import { getError } from '../utils/error'
import axios from 'axios'
import Cookies from 'js-cookie';

import { 
    Container, 
    Title, 
    Text,
    Cart,
    Button,
    Form,
    Input
} from '../styles/Profile/styles'

import { 
    ListItem,
} from '@material-ui/core'

const Profile = () => {
    const { state, dispatch } = useContext(Store)
    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
    } = useForm()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const router = useRouter()
    const { userInfo } = state
    
    useEffect(() => {
        if (!userInfo) {
          return router.push('/login');
        }
        setValue('name', userInfo.name);
        setValue('email', userInfo.email);
    }, []);

    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        closeSnackbar();
        if (password !== confirmPassword) {
          enqueueSnackbar("Passwords don't match", { variant: 'error' });
          return;
        }
        try {
          const { data } = await axios.put(
            '/api/users/profile',
            {
              name,
              email,
              password,
            },
            { headers: { authorization: `Bearer ${userInfo.token}` } }
          );
          dispatch({ type: 'USER_LOGIN', payload: data });
          Cookies.set('userInfo', data);
    
          enqueueSnackbar('Profile updated successfully', { variant: 'success' });
        } catch (err) {
          enqueueSnackbar(getError(err), { variant: 'error' });
        }
      };

    return (
    <Layout title="Profile" description="Profile">
        <Container>
            <Cart style={{ padding: 10}}>
                <Title style={{textAlign: 'center'}}>Profile</Title>
                <ListItem>
                <Form onSubmit={handleSubmit(submitHandler)}>
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
                                            Name is Required
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
                            validate: (value) =>
                                value === '' || 
                                value.length > 5 || 
                                'Password length more than 5',
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
                                {errors.password ? ( 
                                        <span style={{
                                                padding: 5, 
                                                color: 'red',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Password is then more 5
                                        </span> 
                                    ) 
                                    : ('') 
                                }
                            </> 
                            )
                        }
                    ></Controller>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        defaultValue=""
                        rules={{
                            validate: (value) =>
                                value === '' || 
                                value.length > 5 || 
                                'Confirm Password length more than 5',
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
                                {errors.password ? (
                                    <span style={{
                                            padding: 5, 
                                            color: 'red',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Confirm Password length is more than 5
                                    </span> 
                                ) : ('')  
                                }
                            </> 
                            )
                        }
                    />
                    <Button
                        type="submit" 
                        onClick={() => handleSubmit}
                    >
                        <Text style={{ 
                            color: '#000',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontFamily: "Montserrat"
                        }}>
                            Update
                        </Text>
                    </Button>
                    </Form>
                </ListItem>
            </Cart>
        </Container>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Profile), {ssr: false});