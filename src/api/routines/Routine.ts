import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { IApplicationConfigProvider } from '@/infrastructure/interfaces';
import { ApplicationConfigProvider } from '@/infrastructure/providers';
import { schedule, ScheduledTask, ScheduleOptions } from 'node-cron';
import { inject } from 'tsyringe';

abstract class Routine {
  public readonly cron: string;
  protected task?: ScheduledTask;
  protected taskName: string;
  private readonly applicationConfigProvider: IApplicationConfigProvider;

  constructor(
    cron: string,
    taskName: string,
    @inject(strings.applicationConfigProvider) applicationConfigProvider: ApplicationConfigProvider,
  ) {
    if (!cron || typeof cron !== 'string') {
      throw new ApplicationError(strings.invalidCronExpression);
    }

    this.cron = cron;
    this.taskName = taskName;
    this.applicationConfigProvider = applicationConfigProvider;
  }

  public abstract handle(): void;

  protected run(callback: () => unknown, options: ScheduleOptions): ScheduledTask {
    const { enabled } = this.applicationConfigProvider.getRoutinesConfig();

    if (!enabled) {
      throw new ApplicationError(strings.schedulesAreDisabled);
    }

    console.info(this.taskName + ' ' + strings.hasBeenScheduled);

    if (typeof callback !== 'function') {
      throw new ApplicationError(strings.invalidCallbackFunction);
    }

    this.task = schedule(
      this.cron,
      () => {
        // Run the callback function
        callback();

        // Log the task name and status
        console.info(this.taskName + ' ' + strings.isRunning);
      },
      options,
    );

    return this.task;
  }

  public start(): void {
    if (this.task) {
      this.task.start();
    } else {
      throw new ApplicationError(strings.taskAlreadyStarted);
    }
  }

  public stop(): void {
    if (this.task) {
      this.task.stop();
    } else {
      throw new ApplicationError(strings.taskNotStarted);
    }
  }
}

export default Routine;
