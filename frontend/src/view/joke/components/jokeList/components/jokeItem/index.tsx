import React, { useState } from 'react';
import { Joke } from '../../../../../../types';

interface Props {
  joke: Joke;
}

export default function JokeItem(props: Props) {

  const [joke, setJoke] = useState(props.joke);

  const upvote = async (id: string) => {

    const requestOptions = {
      method: 'POST',
    };
    const response = await fetch(`/api/v1/joke/${id}/upvote`, requestOptions);
    const jokesResult = await response.json();
    setJoke(jokesResult.result);
  };

  const downvote = async (id: string) => {

    const requestOptions = {
      method: 'POST',
    };
    const response = await fetch(`/api/v1/joke/${id}/downvote`, requestOptions);
    const jokesResult = await response.json();
    setJoke(jokesResult.result);
  };

  const handleUpvote = () => {
    upvote(joke.id);
  };

  const handleDownvote = () => {
    downvote(joke.id);
  };

  return <div className="Column Container">
    <div>{props.joke.content}</div>
    <div className="Row Container">
      <div>up:{joke.upvotes}</div>
      <div>down:{joke.downvotes}</div>
      <input type='button' value='⌃' onClick={handleUpvote}></input>
      <input type='button' value='⌄' onClick={handleDownvote}></input>
    </div>
  </div>;
}
