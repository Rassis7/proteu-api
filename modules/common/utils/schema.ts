import * as fs from 'fs';

export function importSchema(path: string) {
  const originalPath = path.replace('/build', '');
  return fs.readFileSync(originalPath, 'utf8').toString();
}
