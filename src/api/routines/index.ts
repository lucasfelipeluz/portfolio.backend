import { rules, strings } from '@/core/utils';
import { container as dependencyContainer } from 'tsyringe';
import SystemVariableRoutine from './SystemVariableRoutine';

/**
 * Method to run all routines.
 */
const runRoutines = (): void => {
  dependencyContainer.registerInstance(
    strings.systemVariableRoutine,
    rules.cronMinuteZeroEvery5thHour,
  );

  const systemVariableRoutine = dependencyContainer.resolve(SystemVariableRoutine);

  systemVariableRoutine.handle();
};

export default runRoutines;
