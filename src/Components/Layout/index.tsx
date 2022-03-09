import React from "react";
import Head from "next/head"

import Header from "../Header"
import Footer from "../Footer"

import useThemeMode from "../../hooks/useThemeMode"
import ThemeContext from '../../context/ThemeContext'
import { light, dark } from "../../styles/theme/index"
import { ThemeProvider } from "styled-components"

import { Container, Body } from "./styles"

//RECEBE UM FILHO COMO PROPRIEDADE E UM TITULO PARA HEAD
export default function Layout ({ children, title, description }) {
    
    const { theme, themeToggler } = useThemeMode();
    const themeMode = theme === 'light' ? light : dark;

    return(
        <ThemeContext>
            <ThemeProvider theme={themeMode}>
                <Container>
                    <Head>
                        <title>{title} - Next Amazon </title>
                        {description && <meta name="description" content={description} />}
                        <link rel="icon" href="https://www.omninews.com.br/wp-content/uploads/2019/09/Alecive-Flatwoken-Apps-Amazon.ico" />
                    </Head>
                    <Header
                        theme={theme}
                        themeToggler={themeToggler}
                    />
                    <Body>
                        {/* AQUI VAI O CONTEUDO QUE SERA RENDERIZADO NO LAYOUT PADRAO DO SITE */}
                        {children}
                    </Body>
                    <Footer />
                </Container>
            </ThemeProvider>
        </ThemeContext>
    );
}