import React from 'react';
import './style.css';

interface ImageItemProps extends Image {
  onDeleteButtonClick?: (friendlyName: string) => void;
}

export default React.memo(function ({ friendlyName, size, isRemoving, data, onDeleteButtonClick }: ImageItemProps) {

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onDeleteButtonClick && onDeleteButtonClick(friendlyName);
  }

  return (<div className="ImageItem">
    <label>{friendlyName}</label>
    <label>{size}</label>
    <button onClick={handleClick} disabled={isRemoving}>delete</button>
  </div>);
})
