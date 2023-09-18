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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
