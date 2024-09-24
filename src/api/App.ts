import 'reflect-metadata';
import HeadersMiddlware from '@/api/middlewares/HeadersMiddleware';
import router from '@/api/routes/routes';
import runRoutines from '@/api/routines';
import { helpers, httpResponses } from '@/api/utils';
import * as cors from 'cors';
import * as Express from 'express';
import * as morgan from 'morgan';
import 'reflect-metadata';
import { container as dependencyContainer } from 'tsyringe';
import { strings } from '@/core/utils';
import { HomeController } from './controllers';

class App {
  private readonly app: Express.Application;
  private readonly port: number;

  constructor(port: number) {
    this.app = Express();
    this.port = port;
  }

  private loadRoutines(): void {
    try {
      runRoutines();
    } catch (e) {
      console.log(e);
    }
  }

  private loadOptions(): void {
    this.app.set('trust proxy', 1);

    this.app.use(cors());
    this.app.use(Express.urlencoded({ extended: true }));
    this.app.use(Express.json({ limit: '5mb' }));
    this.app.use(Express.text());

    // Request limiter
    const limiter = helpers.getConfigLimiter();
    this.app.use(limiter);

    // Morgan logger
    helpers.setMorganDateToken();
    this.app.use(morgan('[:date[web]] :method :url :status :response-time ms'));
  }

  private loadRoutes(): void {
    const headersMiddlware = dependencyContainer.resolve(HeadersMiddlware);
    const homeController = dependencyContainer.resolve(HomeController);

    this.app.use('/api', headersMiddlware.handle.bind(headersMiddlware), router);

    this.app.use(
      '/docs',
      headersMiddlware.handle.bind(headersMiddlware),
      homeController.getDocs.bind(homeController),
    );

    this.app.get('/', (req, res) => {
      return httpResponses.ok(res, { message: strings.welcome, docs: strings.urlDocs });
    });

    this.app.get('*', (req, res) => {
      return httpResponses.notFound(res);
    });
  }

  public run(): void {
    this.loadOptions();

    this.loadRoutes();

    this.loadRoutines();

    this.app.listen(this.port, () => {
      helpers.printMsgAPIRunning(this.port, process.env.SERVER_MODE!);
    });
  }
}

export default App;
