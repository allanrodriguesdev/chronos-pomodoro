import { Bounce, ToastContainer } from "react-toastify"

type MessagesContainerProps = {
    children: React.ReactNode
}
export function MessagesContainer({ children }: MessagesContainerProps) {
    return <>
        {children}
        <ToastContainer
            key={Date.now.toString()}
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />

    </>
}