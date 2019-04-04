import { Injectable } from '@nestjs/common';
import { AutoMapper, IConfiguration } from 'automapper-ts-node';

@Injectable()
export class MapperService {
  mapper: AutoMapper;

  constructor() {
    this.mapper = new AutoMapper();
    this.initializeMapper();
  }

  public async map<T>(
    object: Partial<T> | Partial<T>[],
    sourceKey: string,
    destinationKey: string,
  ): Promise<T> {
    return this.mapper.map(sourceKey, destinationKey, object);
  }

  private initializeMapper(): void {
    this.mapper.initialize(MapperService.configure);
  }

  private static configure(config: IConfiguration): void {}
}
