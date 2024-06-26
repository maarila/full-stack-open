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

export default calculateBmi;