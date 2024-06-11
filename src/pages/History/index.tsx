import { Trash2Icon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { DefaultButton } from "../../components/DefaultButton";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";

import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
    useEffect(() => {
        document.title = 'Histórico - Chronos Pomodoro'
      }, []);
    const { state, dispatch } = useTaskContext();
    const [confirmClearHistory, setConfirmClearHistory] = useState(false);
    // const sortedTasks = [...state.tasks].sort((a,b) => {
    //     return b.startDate - a.startDate;
    // });

    // const sortedTasks = sortTasks({ tasks: state.tasks });
    const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({ tasks: state.tasks }),
            field: "startDate",
            direction: "desc"
        }
    });

    useEffect(() => {
        setSortTaskOptions(prevState => ({
            ...prevState,
            tasks: sortTasks({
                tasks: state.tasks,
                direction: prevState.direction,
                field: prevState.field
            })
        }));
    }, [state.tasks]);

    useEffect(() => {
        if(!confirmClearHistory) return;

        setConfirmClearHistory(false);
        dispatch({ type: TaskActionTypes.RESET_STATE });
    }, [confirmClearHistory, dispatch]);

    useEffect(() => {
        return () => {
            showMessage.dismiss();
        }
    }, []);

    // function handleDortTasks({field}: Pick<SortTasksOptions, 'field'>){
    function handleSortTasks({ field }: Omit<SortTasksOptions, 'tasks' | 'direction'>) {
        const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc';
        setSortTaskOptions({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTaskOptions.tasks,
                field,
            }),
            direction: newDirection,
            field
        });
    }

    function handleResetHistory() {
        showMessage.confirm('Tem certeza que deseja apagar o histórico', confirmation => {
            setConfirmClearHistory(confirmation);            
        });
        
    }


    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>Hisotory</span>
                    {state.tasks.length > 0 &&
                        <span className={styles.buttonContainer}>
                            <DefaultButton
                                icon={<Trash2Icon />}
                                color="red"
                                aria-label="Excluir todo o histórico"
                                title="Excluir histórico"
                                onClick={handleResetHistory}
                            />
                        </span>
                    }


                </Heading>

            </Container>
            <Container>
                {state.tasks.length > 0 &&
                    <div className={styles.responsiveTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>Tarefa ↕</th>
                                    <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>Duração ↕</th>
                                    <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>Data ↕</th>
                                    <th>Status</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortTaskOptions.tasks.map((task, indice) => {
                                    const taskTypeDictionary = {
                                        workTime: 'Foco',
                                        shortBreakTime: 'Descanso curto',
                                        longBreakTime: 'Descanso longo',
                                    };
                                    return (
                                        <tr key={`${indice}_${task.id}`}>
                                            <td>{task.name}</td>
                                            <td>{task.duration}min</td>
                                            {/* <td>{new Date(task.startDate).toLocaleString('pt-BR')}</td> */}
                                            <td>{formatDate(task.startDate)}</td>
                                            <td>{getTaskStatus(task, state.activeTask)}</td>
                                            <td>{taskTypeDictionary[task.type]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                }

                {!(state.tasks.length > 0) &&
                    <p style={{ textAlign: "center", fontWeight: "bold"}}>Histórico está vazio</p>
                }
            </Container>
        </MainTemplate>
    );
}