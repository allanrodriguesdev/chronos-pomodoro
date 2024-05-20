import { TaskStateModel } from "../../models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
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
