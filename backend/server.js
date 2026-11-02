const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is alive on port number: ${port}`);
});