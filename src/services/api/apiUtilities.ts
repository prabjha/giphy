import axios from 'axios';
import {IGIF, IGIFServer, IErrorResponse} from './types';

//selecting required field from the response

export const formatGIFResponse = (data: IGIFServer[]): IGIF[] => {
  const gifs: IGIF[] = data.map(gif => {
    return {
      id: gif.id,
      title: gif.title,
      bitly_url: gif.bitly_url,
      url: gif.images.original.url,
      width: parseInt(gif.images.original.width, 10),
      height: parseInt(gif.images.original.height, 10),
      images: {
        original: {
          height: parseInt(gif.images.original.height, 10),
          width: parseInt(gif.images.original.width, 10),
          url: gif.images.original.url,
          mp4: gif.images.original.mp4,
          webp: gif.images.original.webp,
        },
        fixed_width_small: {
          height: parseInt(gif.images.fixed_width_small.height, 10),
          width: parseInt(gif.images.fixed_width_small.width, 10),
          url: gif.images.fixed_width_small.url,
          mp4: gif.images.fixed_width_small.mp4,
          webp: gif.images.fixed_width_small.webp,
        },
      },
    };
  });
  return gifs;
};

// error handle for general cases

export const errorHandler = (error: any): IErrorResponse => {
  if (axios.isAxiosError(error)) {
    //   handle error
    return {
      meta: {
        status: '500',
        msg: 'Something went wrong',
      },
    };
  }
  //default case
  return {
    meta: {
      status: '500',
      msg: 'Something went wrong',
    },
  };
};
