import { Gender, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import { useMatch } from 'react-router-dom';
import { useState } from 'react';
import patientService from '../../services/patients';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const match = useMatch('/api/patient/:id');
  if (match) {
    const idCandidate: unknown = match.params.id;
    if (typeof idCandidate === 'string') {
      const fetchPatient = async () => {
        const fetchedPatient = await patientService.getById(idCandidate);
        setPatient(fetchedPatient);
      };
      patient === null ? fetchPatient() : null;
    }
  }

  if (patient)
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === Gender.Female ? (
            <FemaleIcon fontSize="inherit" />
          ) : patient.gender === Gender.Other ? (
            <TransgenderIcon fontSize="inherit" />
          ) : (
            <MaleIcon fontSize="inherit" />
          )}
        </h2>
        <span></span>
        <div>ssh: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            {entry.date} <em>{entry.description}</em>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
};

export default PatientPage;
