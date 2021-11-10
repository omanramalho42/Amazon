import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;

        colors: {
            primary: string;
            secondary: string;

            effect:string;
            effect_secondary:string;

            text:string;
            background:string;
            shadow: string;

            info: string;
            warning: string;
            danger: string;
            success: string;
        }
    }
}
