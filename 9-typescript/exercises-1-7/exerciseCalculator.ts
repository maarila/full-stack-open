interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescriptions = [
  'poor training',
  'not too bad but could be better',
  'well done',
];

const calculateExercises = (exercises: number[], targetHours: number) => {
  const trainingDays = exercises.filter((hour) => hour !== 0);
  const averageExerciseHours =
    exercises.reduce((sum, hours) => sum + hours) / exercises.length;
  let rating = 2;
  if (averageExerciseHours < targetHours / 2) {
    rating = 1;
  } else if (averageExerciseHours >= targetHours) {
    rating = 3;
  }

  const result: Result = {
    periodLength: exercises.length,
    trainingDays: trainingDays.length,
    success: averageExerciseHours > targetHours,
    rating: rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target: targetHours,
    average: averageExerciseHours,
  };

  return result;
};

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
