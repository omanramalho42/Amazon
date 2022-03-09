import React from "react"

import { Container, Image } from './styles'

interface Props {
    title: string;
    image: string;
}

const CardMedia = ({title, image}: Props) => {
    return(
        <Container>
            <Image 
                src={image}
                alt={title}
            />
        </Container>
    );
}

export default CardMedia;