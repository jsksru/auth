import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ succeed: true });
});

app.listen(3000, () => console.log(`Server listening on 3000 port...`));