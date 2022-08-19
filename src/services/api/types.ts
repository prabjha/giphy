export interface IGIF {
  id: string;
  title: string;
  url: string;
  width: number;
  height: number;
  bitly_url: string;
  images: {
    original: {
      width: number;
      height: number;
      mp4: string;
      url: string;
      webp: string;
    };
    fixed_width_small: {
      width: number;
      height: number;
      url: string;
      webp: string;
      mp4: string;
    };
  };
}

export interface IGIFServer {
  id: string;
  title: string;
  url: string;
  width: string;
  height: string;
  bitly_url: string;
  images: {
    original: {
      width: string;
      height: string;
      mp4: string;
      url: string;
      webp: string;
    };
    fixed_width_small: {
      width: string;
      height: string;
      url: string;
      webp: string;
      mp4: string;
    };
  };
}

export interface IServerResponse {
  data: IGIFServer[];
  pagination: {
    total_count: number;
  };
}

export interface IErrorResponse {
  meta: IResponseMsg;
}

export interface IResponseMsg {
  status: string;
  msg: string;
}
export interface ISearchParam {
  query: string;
  page?: number;
  limit?: number;
}

export type ILoadingStatus = 'idle' | 'succeed' | 'failed' | 'loading';
