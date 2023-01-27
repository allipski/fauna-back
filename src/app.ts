import express, { Express } from 'express';
import cors from 'cors';
import { connectDb, disconnectDb } from '@/config/database';
import { organizationsRouter, projectsRouter, sessionsRouter } from './routers';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/projects", projectsRouter)
  .use("/sign-up", organizationsRouter)
  .use("/sign-in", sessionsRouter);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }

  export async function close(): Promise<void> {
    await disconnectDb();
  }
  
  export default app;