import styles from './styles.module.css';

type GenerucHtmlProps = {
    children: React.ReactNode
}
export function GenericHtml({children}: GenerucHtmlProps){
    return <div className={styles.genericHtml}>{children}</div>;
}