import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { IClient } from '../typings/Client.typings.js';

async function pushCommand(client: IClient, filePath: string): Promise<void> {
	const constructor = await import(pathToFileURL(filePath).toString());
	const instance = new constructor.default();

	client.commands.push(instance);
}

export default async function loadCommands(client: IClient) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const contents = fs.readdirSync(dirname);

  for (const name of contents) {
    if (name !== 'index.js' && name !== 'index.ts') {
      const contentPath = path.join(dirname, name);

      if (fs.lstatSync(contentPath).isDirectory()) {
        const filenames = fs.readdirSync(contentPath);

        for (const filename of filenames) {
          await pushCommand(client, path.join(dirname, name, filename));
        }
      } else {
        await pushCommand(client, contentPath);
      }
    }
  }
}
