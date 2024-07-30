import { rules, strings } from '@/core/utils';
import { container as dependencyContainer } from 'tsyringe';
import SystemVariableRoutine from './SystemVariableRoutine';
import { ApplicationConfigProvider } from '@/infrastructure/providers';

/**
 * Method to run all routines.
 */
const runRoutines = (): void => {
  dependencyContainer.registerInstance(
    strings.systemVariableRoutine,
    rules.cronMinuteZeroEvery5thHour,
  );

  dependencyContainer.register(strings.applicationConfigProvider, ApplicationConfigProvider);

  const systemVariableRoutine = dependencyContainer.resolve(SystemVariableRoutine);

  systemVariableRoutine.handle();
};

export default runRoutines;
