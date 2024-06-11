import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultInput } from "../../components/DeafultInput";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";

import { MainTemplate } from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
    useEffect(() => {
        document.title = 'Configurações - Chronos Pomodoro'
      }, []);
    const { state, dispatch } = useTaskContext();
    const workTimeInput = useRef<HTMLInputElement>(null);
    const shortBreakTimeInput = useRef<HTMLInputElement>(null);
    const longBreakTimeInput = useRef<HTMLInputElement>(null);

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const workTime = Number(workTimeInput.current?.value);
        const shortBreakTime = Number(shortBreakTimeInput.current?.value);
        const longBreakTime = Number(longBreakTimeInput.current?.value);

        if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            showMessage
                .dismiss()
                .error('Apenas números são aceitos');
        }

        if (workTime < 1 || workTime > 99) {
            showMessage
                .dismiss()
                .error('Digite entre 1 e 99 no Foco');
        }
        if (shortBreakTime < 1 || shortBreakTime > 30) {
            showMessage
                .dismiss()
                .error('Digite entre 1 e 30 no Descanso curto');
        }
        if (longBreakTime < 1 || longBreakTime > 60) {
            showMessage
                .dismiss()
                .error('Digite entre 1 e 60 no Descanso longo');
        }


        dispatch({
            type: TaskActionTypes.CHANGE_SETTINGS,
            payload: {
                workTime,
                shortBreakTime,
                longBreakTime

            }
        });
        showMessage.dismiss().success("Configurações atualizadas com sucesso.");
        console.log(workTime, shortBreakTime, longBreakTime);
    }
    return (
        <MainTemplate>
            <Container>
                <Heading>Configurações</Heading>
            </Container>
            <Container>
                <p style={{ textAlign: 'center' }}>Modifique as configurações para tempo de foco, descanso curto e descanso longo</p>
            </Container>
            <Container>
                <form onSubmit={handleSaveSettings} action="" className="form">
                    <div className="formRow">
                        <DefaultInput
                            id="workTime"
                            labelText='Foco'
                            ref={workTimeInput}
                            defaultValue={state.config.workTime}
                            type="number"
                            min={1}
                            max={99}
                        />
                    </div>
                    <div className="formRow">
                        <DefaultInput
                            id="shotBreakTime"
                            labelText='Descanso curto'
                            ref={shortBreakTimeInput}
                            defaultValue={state.config.shortBreakTime}
                            type="number"
                            min={1}
                            max={30}
                        />
                    </div>
                    <div className="formRow">
                        <DefaultInput
                            id="longBreakTime"
                            labelText='Descanso longo'
                            ref={longBreakTimeInput}
                            defaultValue={state.config.longBreakTime}
                            type="number"
                            min={1}
                            max={60}
                        />
                    </div>
                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon />}
                            arial-label="Salvar configurações"
                            title="Salvar configurações"
                        />
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}