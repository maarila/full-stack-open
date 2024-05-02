import calculateExercises from './calculateExercises';

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments');

  const exercises = process.argv
    .slice(2)
    .map((exerciseHours) => Number(exerciseHours));

  const includesNaN = exercises.some((exerciseHours) => isNaN(exerciseHours));

  if (includesNaN) throw new Error('Something other than number in input');

  const targetHours: number = exercises[0];

  console.log(calculateExercises(exercises.slice(1), targetHours));
} catch (error: unknown) {
  let errorMessage = 'Uh oh, something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
