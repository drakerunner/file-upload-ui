import React from 'react';
import './style.css';
import Fuse from 'fuse.js';

import ImageItem from './ImageItem';

const images = [{
    friendlyName: 'Doc1',
    size: 100,
    data: ''
}, {
    friendlyName: 'Doc2',
    size: 100,
    data: ''
}, {
    friendlyName: 'Doc3',
    size: 100,
    data: ''
}, {
    friendlyName: 'Doc4',
    size: 100,
    data: ''
}, {
    friendlyName: 'Doc5',
    size: 100,
    data: ''
}, {
    friendlyName: 'Doc6',
    size: 100,
    data: ''
}];

const options = {
    threshold: 0.2,
    keys: ['friendlyName']
}

const byName = Fuse.createIndex(options.keys, images)

const fuseByName = new Fuse(images, options, byName);

export default function ({ filter }: { filter?: string }) {

    const filteredImages = !filter ? images : fuseByName.search(filter).map(i => i.item);

    return (<div className='ImageList'>
        <header>
            <label>{images.length} documents</label>
            <label>Total size: {images.reduce((sum, image) => sum + image.size, 0)}kb</label>
        </header>
        <main>
            {filteredImages.map(i => <ImageItem key={i.friendlyName} {...i} />)}
        </main>
    </div>);
}