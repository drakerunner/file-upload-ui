import React from 'react';
import './style.css';

import FileSize from '../../FileSize';

interface ImageItemProps extends Image {
  onDeleteButtonClick?: (friendlyName: string) => void;
  onUploadButtonClick?: (file: File | undefined | null, friendlyName: string) => void;
}

export default React.memo(function ({ friendlyName, size, status, file, data, onDeleteButtonClick, onUploadButtonClick }: ImageItemProps) {

  const disabled = (status === 'adding' || status === 'removing');
  const button = (status === 'failedToAdd')
    ? <button onClick={handleUploadButtonClick}>Upload</button>
    : <button onClick={handleDeleteButtonClick} disabled={disabled}>Delete</button>

  function handleDeleteButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onDeleteButtonClick && onDeleteButtonClick(friendlyName);
  }

  function handleUploadButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onUploadButtonClick && onUploadButtonClick(file, friendlyName);
  }

  return (<div className="ImageItem">
    <label>{friendlyName}</label>
    <FileSize bytes={size} />
    {button}
  </div>);

})
