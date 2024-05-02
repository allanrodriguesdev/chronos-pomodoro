import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';
type LogoProps = {
    children: React.ReactNode;
}

export function Logo() {
    
    return <div className={styles.logo}>
        <a href="" className={styles.logoLink}>
            <TimerIcon size={64}/>
            <span>Chronos</span>
        </a>
    </div>;
}