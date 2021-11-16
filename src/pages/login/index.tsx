import React, { useState } from "react"

import NextLink from 'next/link'
import { useRouter } from "next/router"
import axios from 'axios'
import Layout from "../../Components/Layout"

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
} from './styles'

const Login:React.FC = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault(); 
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password
            });
            alert('success login');
        } catch(err) {
            alert(err.response.data ? err.response.data.message : err.message);
        }
    }
    
    return(
        <Layout title="login" description="login">
            <Container>
                <Title>Login</Title>
                <Content>
                    <Form onSubmit={handleSubmitForm}>
                        <Input 
                            placeholder="Insira seu e-mail"
                            value={email}
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            placeholder="Insira sua senha"
                            value={password}
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit" 
                            onClick={handleSubmitForm}
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
                    <NextLink href="/register" passHref>
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

export default Login;