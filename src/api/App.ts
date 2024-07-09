import 'reflect-metadata';
import router from '@/api/routes/routes';
import { httpResponses } from '@/api/utils';
import { strings } from '@/domain/utils';
import * as cors from 'cors';
import * as Express from 'express';
import * as morgan from 'morgan';

class App {
  private readonly app: Express.Application;
  private readonly port: number;

  constructor(port: number) {
    this.app = Express();
    this.port = port;
  }

  private loadOptions(): void {
    this.app.use(cors());
    this.app.use(Express.urlencoded({ extended: true }));
    this.app.use(Express.json());
    this.app.use(Express.text());

    this.app.use(morgan(':method :url :status :response-time ms'));
  }

  private loadRoutes(): void {
    this.app.use('/api', router);

    this.app.get('*', (req, res) => {
      return httpResponses.notFound(res);
    });
  }

  public run(): void {
    this.loadOptions();

    this.loadRoutes();

    this.app.listen(this.port, () => {
      console.log(`${strings.applicationRunning}: ${this.port}`);
    });
  }
}

export default App;
