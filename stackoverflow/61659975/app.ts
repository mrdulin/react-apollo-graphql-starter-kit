import express, { Request, Response } from 'express';

export default class Server {
  server: any;

  exp: any;

  constructor() {
    this.exp = express();
    this.exp.get('/', (_req: Request, res: Response) => {
      res.json('works');
    });
  }

  start(): void {
    this.server = this.exp.listen(3000);
  }

  stop(): void {
    this.server.close();
  }
}
