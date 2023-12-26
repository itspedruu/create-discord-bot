import CommandHandler from '../handlers/Command.handlers.js';

import { IClient } from '../typings/Client.typings.js';
import { ChatInputCommandInteraction } from 'discord.js';

export default function run(client: IClient, interaction: ChatInputCommandInteraction) {
	if (!interaction.isCommand()) {
		return;
	}

	const handler = new CommandHandler(client, interaction);

	handler.run();
}
