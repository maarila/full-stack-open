import calculateBmi from './calculateBmi';

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  if (process.argv.length > 4) throw new Error('Too many arguments');

  const firstNumber: number = Number(process.argv[2]);
  const secondNumber: number = Number(process.argv[3]);

  const isFirstInputNaN = isNaN(firstNumber);
  const isSecondInputNaN = isNaN(secondNumber);

  if (isFirstInputNaN || isSecondInputNaN)
    throw new Error('Something other than number in input');

  console.log(calculateBmi(firstNumber, secondNumber));
} catch (error: unknown) {
  let errorMessage = 'Uh oh, something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
