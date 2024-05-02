import { NewPatient, Gender } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseNameOrOccupation(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseNameOrOccupation(object.occupation),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseNameOrOccupation = (nameOrOccupation: unknown): string => {
  if (!nameOrOccupation || !isString(nameOrOccupation)) {
    throw new Error('Please add both name and occupation');
  }

  return nameOrOccupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isSsn = (ssn: string): boolean => {
  return (
    ssn.includes('-') &&
    ssn.split('-')[0].length === 6 &&
    ssn.split('-')[1].length < 5
  );
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (genderCandidate: string): genderCandidate is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(genderCandidate);
};

export default toNewPatient;
