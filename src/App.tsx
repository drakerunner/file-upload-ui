import React, { useEffect } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import Upload from './components/Upload';
import Loading from './components/Loading';
import ImagesList from './components/ImagesList';

import useImages, { PageStatus } from './shared-state/use-images';

export default function () {

  const [{ pageStatus, images }, dispatch] = useImages();
  const isLoading = pageStatus !== PageStatus.Ready;

  useEffect(() => {
    if (pageStatus === PageStatus.Unitialized) {
      dispatch({ type: 'fetchImages' });

      fetch('api/images')
        .then(res => res.json())
        .then(
          result => dispatch({ type: 'setImages', data: result }),
          error => dispatch({ type: 'setError', error }))
    }
  });

  function handleSearchPatternChange(pattern: string) {
    dispatch({ type: 'filterImages', pattern });
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
          <Upload />
        </header>
        <main>
          {isLoading ? <Loading /> : <ImagesList images={images} onDeleteButtonClick={handleDeleteButtonClick} />}
        </main>
      </div>
    </div>
  );
}
