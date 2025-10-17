import path from 'node:path';
import { defineConfig } from 'prisma/config';

import 'dotenv/config';

export default defineConfig({
  schema: path.join('prisma'),
  migrations: {
    path: path.join('prisma', 'migrations'),
    seed: 'node_modules/.bin/ts-node -r tsconfig-paths/register prisma/index.ts',
  },
});
