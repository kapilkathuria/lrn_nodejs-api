const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/', (req, res) => {
    res.send('Hello World!')
});

const port = process.env.PORT || 3025;
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
