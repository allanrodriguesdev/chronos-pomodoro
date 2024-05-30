import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycles';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  // const cycleStep = Array(5).fill(null);
  const cycleStep = Array.from({ length: state.currentCycle })
  const cycleDescriotionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curso',
    longBreakTime: 'descanso curso',
  };
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span 
              key={`${nextCycleType}_${nextCycle}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`} 
              aria-label={`Indicado de ${cycleDescriotionMap[nextCycleType]}`} 
              title={`Indicado de ${cycleDescriotionMap[nextCycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${styles.cycleDot} ${styles.workTime}`}></span> */}

      </div>
    </div>
  );
}