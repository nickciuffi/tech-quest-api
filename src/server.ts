// eslint-disable-next-line
import app from './app';

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
