import { useEffect, useState } from 'react';
import { DiaryEntry, HeaderProps, DiaryProps, ErrorProps } from './types';
import axios from 'axios';

function App() {
  const [diaryData, setDiaryData] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [newDate, setNewDate] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<string>('');
  const [newWeather, setNewWeather] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const fetchDiaryData = () => {
      axios
        .get<DiaryEntry[]>('http://localhost:3000/api/diaries')
        .then((response) => {
          setDiaryData(response.data);
        });
    };

    fetchDiaryData();
  }, []);

  const Header = (props: HeaderProps) => {
    return <h1>{props.title}</h1>;
  };

  const DiaryInfo = (props: DiaryProps) => {
    return props.entries.map((entry) => (
      <div key={entry.id}>
        <h2>{entry.date}</h2>
        <div>visibility: {entry.visibility}</div>
        <div>weather: {entry.weather}</div>
      </div>
    ));
  };

  const Error = (props: ErrorProps) => {
    return <p style={{ color: 'red' }}>{props.errorMessage}</p>;
  };

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      if (errorMessage) setErrorMessage(undefined);

      const newDiaryEntry = {
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment,
      };

      const response = await axios.post<DiaryEntry>(
        'http://localhost:3000/api/diaries',
        newDiaryEntry
      );

      setDiaryData([...diaryData, response.data]);

      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');

      const visibilityRadioButtons = document.getElementsByName(
        'visibility'
      ) as NodeListOf<HTMLInputElement>;

      const weatherRadioButtons = document.getElementsByName(
        'weather'
      ) as NodeListOf<HTMLInputElement>;

      visibilityRadioButtons.forEach((button) => (button.checked = false));
      weatherRadioButtons.forEach((button) => (button.checked = false));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
      }
    }
  };

  const handleDateChange = (event: React.SyntheticEvent) => {
    setNewDate((event.target as HTMLInputElement).value);
  };

  const handleVisibilityChange = (visibility: string) => {
    setNewVisibility(visibility);
  };

  const handleWeatherChange = (weather: string) => {
    setNewWeather(weather);
  };

  const handleCommentChange = (event: React.SyntheticEvent) => {
    setNewComment((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <Header title="Add new entry" />
      {errorMessage ? <Error errorMessage={errorMessage} /> : ''}
      <form onSubmit={addDiaryEntry}>
        date
        <input type="date" value={newDate} onChange={handleDateChange} />
        <br></br>
        visibility&nbsp;&nbsp; great{' '}
        <input
          type="radio"
          name="visibility"
          onChange={() => handleVisibilityChange('great')}
        />
        good{' '}
        <input
          type="radio"
          name="visibility"
          onChange={() => handleVisibilityChange('good')}
        />
        ok{' '}
        <input
          type="radio"
          name="visibility"
          onChange={() => handleVisibilityChange('ok')}
        />
        poor{' '}
        <input
          type="radio"
          name="visibility"
          onChange={() => handleVisibilityChange('poor')}
        />
        <br></br>
        weather&nbsp;&nbsp; sunny{' '}
        <input
          type="radio"
          name="weather"
          onChange={() => handleWeatherChange('sunny')}
        />
        rainy{' '}
        <input
          type="radio"
          name="weather"
          onChange={() => handleWeatherChange('rainy')}
        />
        cloudy{' '}
        <input
          type="radio"
          name="weather"
          onChange={() => handleWeatherChange('cloudy')}
        />
        stormy{' '}
        <input
          type="radio"
          name="weather"
          onChange={() => handleWeatherChange('stormy')}
        />
        windy{' '}
        <input
          type="radio"
          name="weather"
          onChange={() => handleWeatherChange('windy')}
        />
        <br></br>
        comment
        <input value={newComment} onChange={handleCommentChange} />
        <br></br>
        <button type="submit">add</button>
      </form>
      <Header title="Diary Entries" />
      <DiaryInfo entries={diaryData} />
    </div>
  );
}

export default App;
