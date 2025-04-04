import cors from 'cors';
import express from 'express';
import {initialize} from './app.js';
import setupAuthRoutes from './index.js';
import Group from './Models/groupModel.js';

const app = express();
const port = 4000;

initialize(app);
setupAuthRoutes(app);

  
app.listen(port, () => console.log(`Server listening at port ${port}`));
