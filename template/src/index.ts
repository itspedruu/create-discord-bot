import { config } from 'dotenv';

config();

import('./client.js');

process.on('unhandledRejection', console.error);
