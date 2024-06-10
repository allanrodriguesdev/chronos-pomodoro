import { ToastContentProps } from 'react-toastify';
import { DefaultButton } from '../DefaultButton';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import styles from './styles.module.css';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.buttonsContainer}>
          <DefaultButton
            key={`${Date.now.toString()}_confirm_btn`}
            onClick={() => closeToast(true)}
            icon={<ThumbsUpIcon />}
            aria-label='Confirmar ação e fechar'
            title='Confirmar ação e fechar'
            />
          <DefaultButton
            key={`${Date.now.toString()}_cancel_btn`}
            onClick={() => closeToast(false)}
            icon={<ThumbsDownIcon />}
            color='red'
            aria-label='Cancelar ação e fechar'
            title='Cancelar ação e fechar'
          />
        </div>
      </div>
    </>
  );
}