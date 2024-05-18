import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DeafultInput';
import { DefaultButton } from '../DefaultButton';
import { useTaskContext } from '../../contexts/TaskContext';



export function MainForm() {
    const { setState } = useTaskContext();
    function handlerClick(){
        setState(prevState => {
           return { 
            ...prevState,
            formattedSecondsRemaining: '21:00'
           }
        });
    }
    return  (
        <form className='form' action=''>
            <button type='button' onClick={handlerClick}>Click</button>
            <div className='formRow'>
                <DefaultInput labelText='task' id='meuInput' type='text' placeholder='Digite algo' />
            </div>

            <div className='formRow'>
                <p>Próximo intervalo é de 25min</p>
            </div>

            <div className='formRow'>
                <Cycles />
            </div>

            <div className='formRow'>
                <DefaultButton icon={<PlayCircleIcon />} />
            </div>
        </form>
    );

}