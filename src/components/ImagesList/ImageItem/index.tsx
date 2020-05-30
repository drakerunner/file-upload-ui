import React from 'react';
import './style.css';

export default React.memo(function ({ friendlyName, size, data }: { friendlyName: string, size: number, data: string }) {

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
    }

    return (<div className="ImageItem">
        <label>{friendlyName}</label>
        <label>{size}</label>
        <button onClick={handleClick}>delete</button>
    </div>);
})