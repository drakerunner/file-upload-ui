import React from "react";
import './style.css';

export default function () {

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  return (<div className='Upload'>
    <button onClick={handleClick}>Upload</button>
  </div>);
}
