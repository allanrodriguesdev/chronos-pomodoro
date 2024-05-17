import { Home } from './pages/Home';

import './styles/thema.css';
import './styles/global.css';
import { useState } from 'react';
import { TaskStateModel } from './models/TaskStateModel';

const initialState: TaskStateModel = {
    task: [],
    secondsRemaining: 0,
    formattedSecondsRemaining: '00:00',
    activeTask: null,
    currentCycle: 0,
    config:{
        workTime: 25,
        shortBreaktime: 5,
        LongBreakTIme: 15,
    },
};

export function App() {
    const [state, setState] = useState(initialState);
    // console.log('APP', state);
    return <Home state={state} setState={setState} />;
}