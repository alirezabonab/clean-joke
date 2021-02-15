import React, { useEffect, useState } from 'react';
import { Joke, JokesStatistics } from '../../../../types';

interface Props {
  jokes: Joke[];
}

export default function JokeStatistics(props: Props) {

  const [statistics, setStatistics] = useState<JokesStatistics | undefined>();

  const fetchJokesStatistics = async (jokes: Joke[]) => {
    if (!jokes || jokes.length === 0) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jokes)
    };
    const response = await fetch('/api/v1/joke/statistics', requestOptions);
    const jokesResult = await response.json();
    setStatistics(jokesResult.result);
  };

  useEffect(() => {
    fetchJokesStatistics(props.jokes);
  }, [props.jokes]);

  return <div className="Container Column">
    <h3>Joke Statistics</h3>
    <div>{JSON.stringify(statistics)}</div>
  </div>;
}
