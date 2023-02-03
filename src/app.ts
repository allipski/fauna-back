import express, { Express } from 'express';
import cors from 'cors';
import { connectDb, disconnectDb } from '@/config/database';
import { organizationsRouter, projectsRouter, sessionsRouter, SpeciesRouter } from './routers';
import { IndividualsRouter } from './routers/individualsRouter';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/sign-up", organizationsRouter)
  .use("/sign-in", sessionsRouter)
  .use("/projects", projectsRouter)
  .use("/species", SpeciesRouter)
  .use("/individuals", IndividualsRouter);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }

  export async function close(): Promise<void> {
    await disconnectDb();
  }
  
  export default app;