import fs from 'node:fs';
import path from 'node:path';
import { Client } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'node:url';

export default async function loadEvents(client: Client) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const contents = fs.readdirSync(dirname);

  for (const name of contents) {
    if (name !== 'index.js' && name !== 'index.ts') {
      const filePath = path.join(dirname, name);
          const eventName = name.slice(0, -3);

      const constructor = await import(pathToFileURL(filePath).toString());
          const run = constructor.default;

          client.on(eventName, (...arguments_: unknown[]) => run(client, ...arguments_));
    }
  }
}
