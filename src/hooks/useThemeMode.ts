import { useEffect, useState } from "react";

const useThemeMode = () => {
    const [theme,setTheme] = useState('light');

    const setMode = (mode: string) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode)
    }

    const themeToggler = () => (theme === 'dark' ? setMode('light') : setMode('dark'));

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    },[])

    return {theme, themeToggler, setMode};
};

export default useThemeMode;