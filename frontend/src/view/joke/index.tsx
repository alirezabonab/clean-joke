import React, { useEffect, useState } from 'react';
import { Joke } from '../../types';
import JokeList from './components/jokeList';
import JokeStatistics from './components/jokeStatistics';
import Seek from './components/seek';
import './joke.css';
export default function JokeView() {

  const [jokes, setJokes] = useState<Joke[]>([]);

  const fetchJokes = async (seek: number) => {
    const response = await fetch(`/api/v1/joke?seek=${seek}`);
    const jokesResult = await response.json();
    setJokes(jokesResult.result);
  };

  return (
    <div className="Container Column">
      <Seek setSeekNumber={fetchJokes}></Seek>
      {jokes.length > 0 && <JokeList jokes={jokes}></JokeList>}
      {jokes.length > 0 && <JokeStatistics jokes={jokes}></JokeStatistics>}
    </div>
  );
};
