// eslint-disable-next-line
import Knex from './knex/config/database';
import app from './app';

const port = process.env.APP_PORT;
app.listen(port, async () => {
  const resp = await Knex('Questionaries');
  console.log(`Server started in port ${port}`);
  console.log(resp);
});
