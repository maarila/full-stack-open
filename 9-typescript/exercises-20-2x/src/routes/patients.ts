import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
  const idCandidate: unknown = req.params.id;
  if (typeof idCandidate === 'string' || idCandidate instanceof String) {
    const patientId = req.params.id;
    const patient = patientService.getPatientById(patientId);
    if (patient) {
      patient.entries = [];
      res.send(patient);
    } else {
      res.status(404).send('Patient not found.');  
    }
  } else {
    res.status(400).send('Error in supplied id.');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
