import React from 'react';
import './style.css';

import ImageItem from './ImageItem';

export default function ({ images, onDeleteButtonClick }: { images: Image[], onDeleteButtonClick?: (friendlyName: string) => void; }) {
  return (
    <div className='ImageList'>
      <header>
        <label>{images.length} documents</label>
        <label>Total size: {images.reduce((sum, image) => sum + image.size, 0)}kb</label>
      </header>
      <main>
        {images.map(i => <ImageItem key={i.friendlyName} {...i} onDeleteButtonClick={onDeleteButtonClick} />)}
      </main>
    </div>
  );
}
