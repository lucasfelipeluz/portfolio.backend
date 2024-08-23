import App from './api/App';

const port = parseInt(process.env.PORT_SERVER!, 10);
const app = new App(port);

app.run();
