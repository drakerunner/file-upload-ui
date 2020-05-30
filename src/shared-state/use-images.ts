import { useReducer } from 'react';
import Fuse from 'fuse.js';


type State = {
  pageStatus: PageStatus
  images: Image[];
  filterPattern: string;
};

export enum PageStatus {
  Unitialized = 0,
  FetchingImages,
  SearchingImages,
  Ready
}

type Action =
  | { type: 'fetchImages' }
  | { type: 'setImages', data: Image[] }
  | { type: 'filterImages', pattern: string }
  | { type: 'beginAddingImage', friendlyName: string }
  | { type: 'finishAddingImage', friendlyName: string }
  | { type: 'beginRemovingImage', friendlyName: string }
  | { type: 'finishRemovingImage', friendlyName: string, successful: boolean }
  | { type: 'setError', error: any }
  ;

const initialState: State = {
  pageStatus: PageStatus.Unitialized,
  images: [],
  filterPattern: ''
};

const options = {
  threshold: 0.2,
  keys: ['friendlyName']
}

let allImages: Image[] = [];
let fuseByName = new Fuse([], options);

function findByName(pattern: string) {
  return (pattern !== undefined && pattern !== null && pattern.length > 0)
    ? fuseByName.search(pattern).map(i => i.item)
    : allImages;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {

    case 'fetchImages': return { ...state, pageStatus: PageStatus.FetchingImages }

    case 'setImages': return (() => {
      const { filterPattern } = state;

      allImages = action.data;
      fuseByName = new Fuse(allImages, options, Fuse.createIndex(options.keys, allImages));

      return {
        ...state,
        pageStatus: PageStatus.Ready,
        images: findByName(filterPattern)
      };
    })()

    case 'filterImages': return (() => {
      const filterPattern = action.pattern;

      return {
        ...state,
        filterPattern,
        images: findByName(filterPattern)
      };
    })()

    case 'beginRemovingImage': return (() => {
      const images = state.images.map(i => {
        if (i.friendlyName === action.friendlyName) {
          i.isRemoving = true;
        }

        return i;
      });
      return { ...state, images };
    })()

    case 'finishRemovingImage': return (() => {
      const images = (action.successful)
        ? state.images.filter(i => i.friendlyName !== action.friendlyName)
        : state.images.map(i => {
          if (i.friendlyName === action.friendlyName) {
            i.isRemoving = false;
          }

          return i;
        })

      return { ...state, images };
    })()

    default:
      return state;
  }
}

export default () => useReducer(reducer, initialState)
