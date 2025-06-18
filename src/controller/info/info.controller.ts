import { Controller, Get, Req } from '@nestjs/common';
import * as apiPackageJson from 'iqbspecs-coding-service/package.json';
import { ServiceInfo } from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import * as os from 'node:os';
import { AutocoderService } from '../../services/autocoder/autocoder.service';
import * as packageJson from '../../../package.json';

@Controller('info')
export class InfoController {
  constructor(
    private readonly as: AutocoderService
  ) {
  }

  @Get()
  get(): ServiceInfo {
    return {
      apiVersion: apiPackageJson?.version || 'unknown',
      id: `${packageJson.name}@${os.hostname()}`,
      type: packageJson.name,
      version: packageJson.version,
      instructionsSchema: this.as.schema,
      instructionsText: 'Autocoder service for closed items',
      mode: 'direct'
    };
  }
}
