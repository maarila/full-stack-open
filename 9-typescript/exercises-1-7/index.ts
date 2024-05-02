import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  const isTargetNaN = isNaN(Number(target));

  let includesNaN: boolean = false;

  for (const value of daily_exercises) {
    if (isNaN(Number(value))) {
      includesNaN = true;
    }
  }

  if (isTargetNaN || includesNaN) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dailyExercises: number[] = daily_exercises;

  const exercises = dailyExercises.map((exerciseHours) =>
    Number(exerciseHours)
  );
  const response = calculateExercises(exercises, target as number);
  res.send(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
