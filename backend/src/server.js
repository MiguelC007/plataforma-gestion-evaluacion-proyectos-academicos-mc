import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

connectDb()
  .then(() => {
    app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
  })
  .catch((error) => {
    console.error('Database connection error', error);
    process.exit(1);
  });
