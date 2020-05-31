import React from 'react';
import './style.css';

import ImageItem from './ImageItem';
import FileSize from '../FileSize';

export default function ({ images, onUploadButtonClick, onDeleteButtonClick }: { images: Image[], onUploadButtonClick?: (file: File | undefined | null, friendlyName: string) => void, onDeleteButtonClick?: (friendlyName: string) => void; }) {
  const totalSize = images.reduce((sum, image) => sum + image.size, 0);

  return (
    <div className='ImageList'>
      <header>
        <label>{images.length} documents</label>
        <label>Total size: <FileSize bytes={totalSize} /></label>
      </header>
      <main>
        {images.map(i => <ImageItem key={i.friendlyName} {...i} onDeleteButtonClick={onDeleteButtonClick} onUploadButtonClick={onUploadButtonClick} />)}
      </main>
    </div>
  );
}
