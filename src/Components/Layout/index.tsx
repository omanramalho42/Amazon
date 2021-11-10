import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Container, Body } from "./styles";

const Layout: React.FC = ({ children }) => {
    
    return(
        <Container>
            <Header />
            <Body>
                {children}
            </Body>
            <Footer />
        </Container>
    );
}

export default Layout;