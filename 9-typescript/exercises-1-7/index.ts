import express from 'express';
import calculateBmi from './calculateBmi';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const isValidInput = !isNaN(height) && !isNaN(weight);

  if (!isValidInput) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    const calculationResponse = calculateBmi(height, weight);
    res.send({ weight: weight, height: height, bmi: calculationResponse });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
