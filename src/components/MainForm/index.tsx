import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DeafultInput';
import { DefaultButton } from '../DefaultButton';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycles';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { fortmatSecondsToMinutes } from '../../utils/fortmatSecondsToMinutes';




export function MainForm() {
    const { state, setState } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();
        if (!taskName) {
            alert('digite o nome da tarefa')
            return
        }
        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        }
        const secondsRemaining = newTask.duration * 60;
        setState(prevState => {
            return {
                ...prevState,
                config: { ...prevState.config },
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining, //conferir
                formattedSecondsRemaining: fortmatSecondsToMinutes(secondsRemaining),
                tasks: [...prevState.tasks, newTask]
            }
        });
    }

    return (
        <form onSubmit={handleCreateNewTask} className='form' action=''>
            <div className='formRow'>
                <DefaultInput
                    labelText='task'
                    id='meuInput'
                    type='text'
                    placeholder='Digite algo'
                    ref={taskNameInput}
                />
            </div>


            <div className='formRow'>
                <p>Próximo intervalo é de {state.activeTask?.duration ?? 25}min</p>
            </div>

            {state.currentCycle > 0 && (
                <>
                    <div className='formRow'>
                        <Cycles />
                    </div>
                </>
            )}
            <div className='formRow'>
                <DefaultButton icon={<PlayCircleIcon />} />
            </div>
        </form>
    );
}