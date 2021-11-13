import React from 'react';

import { ThemeProvider } from 'styled-components';
import useThemeMode from '../hooks/useThemeMode';
import {light, dark} from '../styles/theme/index';


const ThemeContext = ({ children }) => {
    const { theme }  = useThemeMode();
    const themeMode = theme === 'dark' ? dark : light

    return(
        <ThemeProvider theme={themeMode}>
            { children }
        </ThemeProvider>
    )
};

export default ThemeContext;