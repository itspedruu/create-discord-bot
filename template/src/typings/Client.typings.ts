import CommandInterface from '../interfaces/Command.interfaces.js';
import { Client, ChatInputApplicationCommandData } from 'discord.js';

export interface ICommandOptions extends ChatInputApplicationCommandData {
  parent?: string;
}

export interface IClient extends Client {
  commands: CommandInterface[];
}
