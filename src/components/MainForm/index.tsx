import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DeafultInput';
import { DefaultButton } from '../DefaultButton';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycles';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';




export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);



    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();
        if (!taskName) {
            showMessage.dismiss()
            showMessage.warn('digite o nome da tarefa')
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

        showMessage.dismiss()
        showMessage.info('Tarefa iniciada!')
        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })
    }

    function handleInterruptTask() {
        showMessage.dismiss()
        showMessage.error('Tarefa interrompida!')
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
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
                    disabled={!!state.activeTask}
                />
            </div>


            <div className='formRow'>
                <Tips />
            </div>

            {state.currentCycle > 0 && (
                <>
                    <div className='formRow'>
                        <Cycles />
                    </div>
                </>
            )}
            <div className='formRow'>
                {!state.activeTask && (
                    <DefaultButton
                        key={'btn-submit'}
                        aria-label='Iniciar nova tarefa'
                        title='Iniciar nova tarefa'
                        type="submit"
                        icon={<PlayCircleIcon />}
                    />
                )}

                {!!state.activeTask && (
                    <DefaultButton
                        key={'btn-button'}
                        aria-label='Interromper tarefa atual'
                        title='Interromper tarefa atual'
                        type="button"
                        color='red'
                        icon={<StopCircleIcon />}
                        onClick={handleInterruptTask}
                    />

                )}
            </div>
        </form>
    );
}