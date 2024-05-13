import { TaskModel } from './TaskModel';
export type TaskStateModel = {
    task: TaskModel[];
    secondsRemaining: number;
    formattedSecondsRemaining: string;
    activeTask: TaskModel;
    currentCycle: number; // 1 a 8
    config: {
        workTime: number;
        shortBreaktime: number;
        LongBreakTIme: number;
    }
};