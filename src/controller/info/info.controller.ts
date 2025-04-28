import { Controller, Get, Req } from '@nestjs/common';
import * as packageJson from '../../../package.json';
import * as apiPackageJson from 'iqbspecs-coding-service/package.json';
import { AutocoderService } from '../../services/autocoder/autocoder.service';
import { ServiceInfo } from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import * as os from 'node:os';

@Controller('info')
export class InfoController {
  constructor(
    private readonly as: AutocoderService
  ) {
  }
  @Get()
  get(@Req() request: Request): ServiceInfo {
    return {
      apiVersion: apiPackageJson?.version || 'unknown',
      id: packageJson.name + '@' + os.hostname(),
      type: packageJson.name,
      version: packageJson.version,
      instructionsSchema: this.as.schema,
      instructionsText: 'Autocoder service for closed items'
    }
  }
}
