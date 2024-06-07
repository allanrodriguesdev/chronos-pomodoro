import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimeWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import { TaskStateModel } from "../../models/TaskStateModel";


type TaskContextProviderProps = {
    children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () =>{
        const storateState = localStorage.getItem('state');
        if(!storateState) return initialTaskState;
        const parsedStorageState = JSON.parse(storateState) as TaskStateModel;

        return {
            ...parsedStorageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });
    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    const worker = TimerWorkerManager.getInstance();
    worker.onmessage(e => { 
        const countDownSeconds = e.data;

        if(countDownSeconds <=0){
            if(playBeepRef.current) {
                playBeepRef.current();
            }
            dispatch({
                type: TaskActionTypes.COMPLETE_TASK
            });
            worker.terminate();
        }else{
            dispatch({
                type: TaskActionTypes.COWNT_DOWN, 
                payload: {secondsRemaining: countDownSeconds}
            });
        }

     });
    useEffect(() => {
        // Estado certo
        localStorage.setItem('state', JSON.stringify(state));
        if(!state.activeTask){
            worker.terminate();
        }

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

        worker.postMessage(state);
    }, [worker, state]);

    useEffect(() =>{
        if(state.activeTask && playBeepRef.current === null){
            playBeepRef.current = loadBeep();
        }else{
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}