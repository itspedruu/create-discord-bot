import CommandInterface from '../interfaces/Command.interfaces.js';

import { IClient } from '../typings/Client.typings.js';
import { ChatInputCommandInteraction } from 'discord.js';

export default class CommandHandler {
  client: IClient;
	interaction: ChatInputCommandInteraction;

	constructor(client: IClient, interaction: ChatInputCommandInteraction) {
    this.client = client;
		this.interaction = interaction;
	}

	searchCommand(): CommandInterface | undefined {
		const commandName = this.interaction.commandName;
		const subCommandName = this.interaction?.options?.getSubcommand?.(false);

		const options = subCommandName
			? { name: subCommandName, parent: commandName }
			: { name: commandName };

		return this.client.commands.find((command) =>
			command.options.name === options.name &&
			(options.parent ? command.options.parent === options.parent : true)
		);
	}

	async run() {
		if (this.interaction.user.bot) {
			return;
		}

		const command = this.searchCommand();
		
		if (!command) {
			return;
		}

		command.execute({
			client: this.client,
			interaction: this.interaction
		});
	}
}
