import { Home } from './pages/Home';

import './styles/thema.css';
import './styles/global.css';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routes/MainRouter';


export function App() {
    return (
        <TaskContextProvider>
            <MessagesContainer>
                <MainRouter />
            </MessagesContainer>
        </TaskContextProvider>
    );
}