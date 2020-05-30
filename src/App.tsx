import React, { useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import Upload from './components/Upload';
import ImagesList from './components/ImagesList';

export default function () {

  const [searchPattern, setSearchPattern] = useState('');

  function handleSearchPatternChange(pattern: string) {
    setSearchPattern(pattern);
  }

  return (
    <div className="App">
      <div>
        <header>
          <SearchBar onSearchPatternChange={handleSearchPatternChange} />
          <Upload />
        </header>
        <main>
          <ImagesList filter={searchPattern} />
        </main>
      </div>
    </div>
  );
}