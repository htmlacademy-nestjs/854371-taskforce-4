import { ConfigService } from '@nestjs/config';
import { getRabbitConnectionString } from './get-rabbit-connection-string';

export function getRabbitOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.exchange`),
          type: 'direct',
        }
      ],
      uri: getRabbitConnectionString({
        username: config.get<string>(`${optionSpace}.username`),
        password: config.get<string>(`${optionSpace}.password`),
        host: config.get<string>(`${optionSpace}.host`),
        port: config.get<string>(`${optionSpace}.port`)
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true
    }),
    inject: [ ConfigService ]
  };
}
