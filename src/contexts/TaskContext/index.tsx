import { createContext, useContext, useState } from "react";
import { TaskStateModel } from "../../models/TaskStateModel";

const initialState: TaskStateModel = {
    task: [],
    secondsRemaining: 0,
    formattedSecondsRemaining: '00:00',
    activeTask: null,
    currentCycle: 0,
    config: {
        workTime: 25,
        shortBreaktime: 5,
        LongBreakTIme: 15,
    },
};

type taskContextProps = {
    state: TaskStateModel,
    setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}
const initialContextValue = {
    state: initialState,
    setState: () => { },
};
export const TaskContext = createContext<taskContextProps>(initialContextValue);

type TaskContextProviderProps = {
    children: React.ReactNode;
}
export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, setState] = useState(initialState);
    return (
        <TaskContext.Provider value={{state, setState}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext(){
    return useContext(TaskContext);
}