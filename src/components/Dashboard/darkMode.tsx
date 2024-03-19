import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface IDarkMode {
    id: string;
}

function darkMode({ id }: IDarkMode) {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const currentMode = localStorage.getItem('darkMode');
        const dashboard = document.getElementById(id) as HTMLElement;

        if(currentMode == 'true') {
            dashboard.classList.add('dark');
            dashboard.classList.remove('white');
            setDarkMode(true);
        }

        if(currentMode == 'false') {
            dashboard.classList.remove('dark');
            dashboard.classList.add('white');
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', `${darkMode}`);

        const dashboard = document.getElementById(id) as HTMLElement;

        if(darkMode == true) {
            dashboard.classList.add('dark');
            dashboard.classList.remove('white');
        }

        if(darkMode == false) {
            dashboard.classList.remove('dark');
            dashboard.classList.add('white');
        }
    }, [darkMode]);

    return (
        <div onClick={() => setDarkMode(!darkMode)} className='cursor-pointer w-[40px] h-[40px] bg-slate-300 px-2 py-1 rounded-sm flex items-center justify-center border border-slate-900'>
            {darkMode ? (
                <FontAwesomeIcon className={'text-slate-900'} icon={faSun} />
            ) : (
                <FontAwesomeIcon className={'text-slate-900'} icon={faMoon} />
            )}
        </div>
    )
}

export default darkMode