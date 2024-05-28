import { TaskModel } from "../models/TaskModel";

export function getNextCycleType(currentCycle: number): TaskModel['type']{
    if(currentCycle % 8 === 0) return 'LongBreakTIme';
    if(currentCycle % 2 === 0) return 'shortBreaktime';
    return 'workTime';
}