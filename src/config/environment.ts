import Config from 'react-native-config';

export abstract class ENV {
  public static readonly baseUrl: string = Config.BASE_URL;
  public static readonly apiKey: string = Config.API_KEY;
}
