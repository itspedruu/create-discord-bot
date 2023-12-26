import CommandInterface from '../../interfaces/Command.interfaces.js';

export default class PingCommand extends CommandInterface {
  constructor() {
    super({
      name: 'ping',
      description: 'Pong!'
    });
  }

  run() {
    this.interaction.reply({
      content: 'Pong',
      ephemeral: true
    });
  }
}
