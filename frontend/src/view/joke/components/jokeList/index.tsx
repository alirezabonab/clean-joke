import React from 'react';
import { Joke } from '../../../../types';
import JokeItem from './components/jokeItem';

interface Props {
  jokes: Joke[];
}

export default function JokeList(props: Props) {

  return <div className="Container Column">
    {props.jokes.map(joke => {
      return <JokeItem joke={joke} key={joke.id}></JokeItem>;
    })}
  </div>;
}
