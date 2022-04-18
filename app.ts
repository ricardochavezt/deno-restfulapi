import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import logger from './Middlewares/logger.ts';
import header from './Middlewares/header.ts';
import notFound from './Middlewares/notFound.ts';
import errorHandler from './Middlewares/errorHandler.ts';

import { IUser, Users } from './Models/Users.ts';

import { userRouter } from './Routes/UserRouter.ts';

const app = new Application();

app.use(logger);
app.use(header);
app.use(errorHandler);
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(notFound);

console.log("Deno ejecutándose en http://localhost:8000")
await app.listen({port: 8000});
