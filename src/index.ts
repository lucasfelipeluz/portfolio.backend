import './utils/module-alias.ts';
import express, { urlencoded } from 'express';
import { Server } from '@overnightjs/core';
import * as dotenv from 'dotenv';

import strings from '@src/utils/strings';
import routes from './routes/routes';

// .env
dotenv.config();
class SetupServer extends Server {
  constructor(private port?: string) {
    super();
    this.port = port;
  }

  public init(): void {
    this.setupExpress();
  }

  private setupExpress(): void {
    // Body parser
    this.app.use(urlencoded({ limit: '200mb', extended: false }));
    this.app.use(express.json({ limit: '200mb' }));
    this.app.use(express.text({ limit: '200mb' }));

    // Iniciando servidor
    this.app.listen(this.port || '8080', () => {
      console.log(`${strings.servidorRodando}${this.port || '8080'}`);
    });

    // Rotas
    this.app.use(routes);
  }
}

new SetupServer(process.env.PORT_SERVER).init();
