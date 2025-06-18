import {
  HttpException, Injectable, HttpStatus, Inject
} from '@nestjs/common';
import * as fs from 'fs';
import { Coder, ResponseRow } from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import { AutoCodingInstructions } from 'iqbspecs-coding-service/interfaces/iqb.interfaces';
import { IdService } from '../id.service';

@Injectable()
export class DataService {
  constructor(
    @Inject('STORAGE_DIR') private storageDir: string
  ) {
    if (!fs.existsSync(`${this.storageDir}/data`)) {
      fs.mkdirSync(`${this.storageDir}/data`);
    }
  }

  add(data: ResponseRow[]): string {
    const id = IdService.create();
    fs.writeFileSync(`${this.storageDir}/data/${id}.json`, JSON.stringify(data), { encoding: 'utf8' });
    return id;
  }

  get(chunkId: string): ResponseRow[] {
    if (!fs.existsSync(`${this.storageDir}/data/${chunkId}.json`)) {
      throw new HttpException(`Data chunk '${chunkId}' not found.`, HttpStatus.NOT_FOUND);
    }
    const data = fs.readFileSync(`${this.storageDir}/data/${chunkId}.json`, { encoding: 'utf8' });
    return JSON.parse(data) as ResponseRow[]; // TODO verify
  }

  delete(chunkId: string): void {
    const chunkFilePath = `${this.storageDir}/data/${chunkId}.json`;
    if (!fs.existsSync(chunkFilePath)) {
      throw new HttpException('Data chunk not found.', HttpStatus.NOT_FOUND);
    }
    fs.rmSync(chunkFilePath);
  }

  restore(): string[] {
    return fs.readdirSync(`${this.storageDir}/data/`)
      .filter(file => file.endsWith('.json'))
      .map(file => file.substring(0, file.indexOf('.json')));
  }

  store(id: string, coded: ResponseRow[]): void {
    fs.writeFileSync(`${this.storageDir}/data/${id}.json`, JSON.stringify(coded));
  }

  // eslint-disable-next-line class-methods-use-this
  getExampleCodingScheme(): AutoCodingInstructions {
    return <AutoCodingInstructions>{ variableCodings: [], version: '0.0' };
  }

  listCoders(): Coder[] {
    return fs.readdirSync(`${this.storageDir}/instructions/`)
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        return {
          id: fileName.substring(0, fileName.indexOf('.json')),
          label: fileName
        };
      });
  }

  deleteCoder(coderId: string): void {
    const filePath = `${this.storageDir}/instructions/${coderId}.json`;
    if (!fs.existsSync(filePath)) {
      throw new HttpException('Coder not found.', HttpStatus.NOT_FOUND);
    }
    fs.rmSync(filePath); // TODO use async
  }
}
