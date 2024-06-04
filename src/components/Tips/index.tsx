import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycles";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
    const { state } = useTaskContext();
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    // Tips
    const tipsForWhenActiveTask = {
        workTime: <span>Foque por <strong>{state.config.workTime}min</strong></span>,
        shortBreakTime: <span>Desncase por <strong>{state.config.workTime}min</strong></span>,
        longBreakTime: <span>Descanço longo</span>,
    }

    const tipsForNoActiveTask = {
        workTime: <span>Próximo ciclo é de <strong>{state.config.workTime}min</strong></span>,
        shortBreakTime: <span>Próximo descanso é de <strong>{state.config.workTime}min</strong></span>,
        longBreakTime: <span>Próximo descanço será longo</span>,
    }

    return (
        <>
            {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
            {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
        </>
    );
}