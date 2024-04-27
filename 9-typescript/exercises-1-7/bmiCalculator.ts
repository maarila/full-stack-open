const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 16) {
    return 'Underweight (severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (mild thinness)';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

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
