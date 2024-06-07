import { Trash2Icon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { DefaultButton } from "../../components/DefaultButton";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskModel } from "../../models/TaskModel";
import { TaskStateModel } from "../../models/TaskStateModel";

export function History() {
    const { state } = useTaskContext();
    const completeDate = (task: TaskModel) => {
        if(task.completeDate) return 'Completa';
        if(task.interruptDate) return 'Interrompido';
        if((task.startDate + (task.duration * 60 * 1000)) > Date.now() && task.id == state.activeTask?.id) {
            return 'Em andamento';
        }
        return 'Abandonada';
    }
    
    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>Hisotory</span>
                    <span className={styles.buttonContainer}>
                        <DefaultButton
                            icon={<Trash2Icon />}
                            color="red"
                            aria-label="Excluir todo o histórico"
                            title="Excluir histórico"
                        />
                    </span>
                </Heading>
            </Container>
            <Container>
                <div className={styles.responsiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Tarefa</th>
                                <th>Duração</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.tasks.map((task, indice) => {
                                return (
                                    <tr key={`${indice}_${task.id}`}>
                                        <td>{task.name}</td>
                                        <td>{task.duration}min</td>
                                        <td>{new Date(task.startDate).toLocaleString('pt-BR')}</td>
                                        <td>{completeDate(task)}</td>
                                        <td>Foco</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Container>
        </MainTemplate>
    );
}