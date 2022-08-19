import {ENV} from '@giphy/config';
import axios, {Axios, AxiosResponse} from 'axios';
import {DEFAULT_LIMIT, TRENDING_ENDPOINT} from './constant';

import {ISearchParam, IServerResponse} from './types';

// class for apply instance

class GiphyApi {
  private api: Axios;
  private apiController: AbortController | undefined;
  public constructor() {
    //basic config
    this.api = axios.create({
      baseURL: ENV.baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        api_key: ENV.apiKey, //api key as param
      },
    });
  }

  // get trending gifs

  public getTrendingGifs = async (
    page: number = 0,
  ): Promise<AxiosResponse<IServerResponse>> => {
    if (this.apiController) {
      this.apiController.abort(); // aborting previous pending request
    }
    this.apiController = new AbortController();
    const response = await this.api.get<IServerResponse>(TRENDING_ENDPOINT, {
      params: {
        limit: DEFAULT_LIMIT * 2,
        offset: page * DEFAULT_LIMIT * 2,
      },
      signal: this.apiController.signal,
    });
    return response;
  };

  public search = async (
    searchParam: ISearchParam,
  ): Promise<AxiosResponse<IServerResponse>> => {
    if (this.apiController) {
      this.apiController.abort();
    }
    this.apiController = new AbortController();
    if (!searchParam.page) searchParam.page = 0;
    const response = await this.api.get<IServerResponse>('gifs/search', {
      params: {
        q: searchParam.query,
        limit: searchParam.limit || DEFAULT_LIMIT,
        offset: searchParam.page * (searchParam.limit || DEFAULT_LIMIT),
      },
      signal: this.apiController.signal,
    });
    return response;
  };
}

export default new GiphyApi();
