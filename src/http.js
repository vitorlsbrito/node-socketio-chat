import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { dirname, resolve } from 'path';
import {  fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectory = resolve(__dirname, '../', 'public');

const app = express();
app.use(express.static(publicDirectory));

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp);
