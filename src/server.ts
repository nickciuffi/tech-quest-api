// eslint-disable-next-line
import Knex from './knex/config/database';
import app from './app';

const port = process.env.APP_PORT;
app.listen(port, async () => {
  console.log(`Server started in port ${port}`);
});
