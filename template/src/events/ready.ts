import { IClient } from '../typings/Client.typings.js';

export default async function run(client: IClient) {
  console.log(`${client.user!.username} is online!`);

  try {
    const slashCommands = client.commands.map((command) => command.options);

    await client.application!.commands.set(slashCommands);
  } catch (error) {
    console.error('Unable to post slash commands');

    throw error;
  }
}
