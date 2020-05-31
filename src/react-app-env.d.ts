/// <reference types="react-scripts" />

interface Image {
  friendlyName: string;
  size: number;
  data?: string;
  file?: File;
  status: 'adding' | 'removing' | 'failedToAdd' | 'failedToRemove' | 'ready';
};
