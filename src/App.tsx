import React, { useEffect } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import Upload from './components/Upload';
import Spinner from './components/Spinner';
import ImagesList from './components/ImagesList';

import useImages, { ApiStatus } from './state/use-images';

export default function () {

  const [{ apiStatus, images }, dispatch] = useImages();
  const main = apiStatus === ApiStatus.Ready
    ? <ImagesList images={images} onDeleteButtonClick={handleDeleteButtonClick} onUploadButtonClick={handleFileSelected} />
    : <Spinner />
    ;

  useEffect(() => {
    if (apiStatus === ApiStatus.Unitialized) {
      dispatch({ type: 'beginFetchingImages' });

      fetch('api/images')
        .then(res => res.json())
        .then(
          result => dispatch({ type: 'finishFetchingImages', data: result }),
          error => dispatch({ type: 'setError', error }))
    }
  });

  function handleSearchPatternChange(pattern: string) {
    dispatch({ type: 'beginFilteringImages', pattern });
  }

  function handleFileSelected(file: File | undefined | null, friendlyName: string) {
    if (file) {
      dispatch({
        type: 'beginAddingImage', image: {
          friendlyName,
          size: file.size,
          file,
          status: 'adding'
        }
      })

      const body = new FormData();
      body.append('file', file);

      fetch('api/images/' + encodeURIComponent(friendlyName), { method: 'POST', body })
        .then(
          res => dispatch({ type: 'finishAddingImage', friendlyName, successful: res.ok }),
          error => dispatch({ type: 'finishAddingImage', friendlyName, successful: false }))
        ;
    }
  }

  function handleDeleteButtonClick(friendlyName: string) {
    dispatch({ type: 'beginRemovingImage', friendlyName });

    fetch('api/images/' + encodeURIComponent(friendlyName), { method: 'DELETE' })
      .then(
        res => dispatch({ type: 'finishRemovingImage', friendlyName, successful: res.ok }),
        error => dispatch({ type: 'finishRemovingImage', friendlyName, successful: false }))
      ;
  }

  return (
    <div className="App">
      <div>
        <header>
          <SearchBar onSearchPatternChange={handleSearchPatternChange} />
          <Upload onFileSelected={handleFileSelected} />
        </header>
        <main>
          {main}
        </main>
      </div>
    </div>
  );
}
