import { Step, StepLabel, Stepper } from '@material-ui/core';

import React from "react"
import { Title } from './styles';

const CheckoutWizzard = ({activeStep = 0}) => {
    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            style={{backgroundColor: 'transparent'}}
        >
            {['login', 'Shipping Adrress', 'Payament Method', 'Place Order'].map(
                (step) => (
                    <Step 
                        key={step}
                    >
                        <StepLabel>
                            <Title>{step}</Title>
                        </StepLabel>
                    </Step>
                )
            )}
        </Stepper>
    );
}

export default CheckoutWizzard