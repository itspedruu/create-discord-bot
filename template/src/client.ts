import { Client } from 'discord.js';

import loadEvents from './events/index.js';
import loadCommands from './commands/index.js';

import { IClient } from './typings/Client.typings.js';

const client = new Client({ intents: [] }) as IClient;

client.commands = [];

loadEvents(client);
loadCommands(client);

client.login(process.env.TOKEN);
