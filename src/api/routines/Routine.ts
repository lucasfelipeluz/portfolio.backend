import { ApplicationError } from '@/core/errors';
import { strings } from '@/core/utils';
import { schedule, ScheduledTask, ScheduleOptions } from 'node-cron';

abstract class Routine {
  public readonly cron: string;
  protected task?: ScheduledTask;
  protected taskName: string;

  constructor(cron: string, taskName: string) {
    if (!cron || typeof cron !== 'string') {
      throw new ApplicationError(strings.invalidCronExpression);
    }

    this.cron = cron;
    this.taskName = taskName;
  }

  public abstract handle(): void;

  protected run(callback: () => unknown, options: ScheduleOptions): ScheduledTask {
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
