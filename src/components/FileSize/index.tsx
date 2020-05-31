import React from 'react';

const k = 1024;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function formatBytes(bytes: number, decimals = 2) {
  let size = 0;
  let suffix = sizes[0];

  if (bytes > 0) {
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    suffix = sizes[i];
  }

  return { size, suffix };
}

export default function ({ bytes }: { bytes: number }) {
  const { size, suffix } = formatBytes(bytes);

  return (<label>{size} {suffix}</label>);
}
