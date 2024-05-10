import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DeafultInput';
import { DefaultButton } from '../DefaultButton';



export function MainForm() {
    return  (
        <form className='form' action=''>
            <div className='formRow'>
                <DefaultInput labelText='task' id='meuInput' type='text' placeholder='Digite algo' />
            </div>

            <div className='formRow'>
                <p>Lorem ipsum dolor sit amet.</p>
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