import { Heading } from './components/Heading';


import './styles/thema.css';
import './styles/global.css';
import { Container } from './components/Container';
import { Logo } from './components/Logo';



export function App() {
    return (
        <>
            <Container>
                <Logo />
            </Container>
            <Container>
                <Heading>MENU</Heading>
            </Container>

            
        </>
    );
}

