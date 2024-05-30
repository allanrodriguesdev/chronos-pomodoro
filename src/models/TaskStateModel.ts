import { TaskModel } from './TaskModel';

// Estado -> COmponente -> Filhos

export type TaskStateModel = {
    tasks: TaskModel[]; // History, MainForm
    secondsRemaining: number; //Home, CowntDown, History, MainForm, Button
    formattedSecondsRemaining: string; // Title, CowntDown, History, MainForm, Button
    activeTask: TaskModel | null; //CowntDown, History, MainForm, Button
    currentCycle: number; // 1 a 8 only Home
    config: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
    }
};