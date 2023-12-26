import { ChatInputCommandInteraction } from 'discord.js';
import { IClient, ICommandOptions } from '../typings/Client.typings.js';

export default class CommandInterface {
  options: ICommandOptions;
	client: IClient;
	interaction: ChatInputCommandInteraction;
	[key: string]: unknown;

  run?(): void;

	constructor(options: ICommandOptions) {
		this.options = options;
		
		this.client = undefined as unknown as IClient;
		this.interaction = undefined as unknown as ChatInputCommandInteraction;
	}

	execute(options: Record<string, unknown>) {
		for (const key of Object.keys(options)) {
			this[key] = options[key];
		}

		this.run?.();
	}
}
