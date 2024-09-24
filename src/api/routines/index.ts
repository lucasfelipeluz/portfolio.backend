import { rules, strings } from '@/core/utils';
import { container as dependencyContainer } from 'tsyringe';
import SystemVariableRoutine from './SystemVariableRoutine';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import AcessMetricsRoutine from './AcessMetricsRoutine';

/**
 * Method to run all routines.
 */
const runRoutines = (): void => {
  dependencyContainer.registerInstance(
    strings.systemVariableRoutine,
    rules.cronMinuteZeroEvery5thHour,
  );

  dependencyContainer.registerInstance(strings.acessMetricsRoutine, '* * * * *');

  dependencyContainer.register(strings.applicationConfigProvider, ApplicationConfigProvider);

  const systemVariableRoutine = dependencyContainer.resolve(SystemVariableRoutine);
  const acessMetricsRoutine = dependencyContainer.resolve(AcessMetricsRoutine);

  systemVariableRoutine.handle();
  acessMetricsRoutine.handle();
};

export default runRoutines;
