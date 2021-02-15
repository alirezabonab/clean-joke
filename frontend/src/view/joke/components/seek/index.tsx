import React, { useState } from 'react';


interface Props {
  setSeekNumber: (seek: number) => void;
}

export default function Seek(props: Props) {

  const [seek, setSeek] = useState<number>(5);

  return <div className="Row Container">
    <input
      type='number'
      value={seek}
      onChange={e => setSeek(Number.parseInt(e.target.value))} ></input>
    <input type='button' value='list jokes' onClick={() => { props.setSeekNumber(seek); }}></input>
  </div>;
}
