import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvaiableThemes = 'dark' | 'light';
export function Menu() {
  const [theme, setTheme] = useState<AvaiableThemes>(()=>{
    const storageTheme = localStorage.getItem('theme') as AvaiableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    'dark' : <SunIcon/>,
    'light' : <MoonIcon/>
  };
 
  function handleThemeChange ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ){
    event.preventDefault();
    setTheme((preveTheme)=> {
      return preveTheme === 'dark' ? 'light' : 'dark';
    });
  }
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    return ()=>{  };//executa função de cleanup para remover eventos duplicados
  },[theme]);

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href='#' aria-label='Ir para a home' title='Ir para a home'>
        <HouseIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Ver histórico' title='Ver histórico'>
        <HistoryIcon />
      </a>

      <a className={styles.menuLink} href='#' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </a>

      <a className={styles.menuLink} href='#' onClick={handleThemeChange} aria-label='Alterar Tema' title='Alterar Tema'>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}