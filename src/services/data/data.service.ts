import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import * as fs from 'fs';
import { IdService } from '../id.service';
import {ResponseRow} from "iqbspecs-coding-service/interfaces/ics-api.interfaces";
import {AutoCodingInstructions} from "iqbspecs-coding-service/interfaces/iqb.interfaces";


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
    fs.writeFileSync(`${this.storageDir}/data/${id}.json`, JSON.stringify(data), { encoding: 'utf8'});  // TODO use async
    return id;
  }

  get(chunkId: string): ResponseRow[] {
    if (!fs.existsSync(`${this.storageDir}/data/${chunkId}.json`)) {
      throw new HttpException(`Data chunk '${chunkId}' not found.`, HttpStatus.NOT_FOUND);
    }
    const data = fs.readFileSync(`${this.storageDir}/data/${chunkId}.json`, { encoding: 'utf8'}); // TODO use async
    return JSON.parse(data) as ResponseRow[]; // TODO verify
  }

  delete(chunkId: string): void {
    const chunkFilePath = `${this.storageDir}/data/${chunkId}.json`;
    if (!fs.existsSync(chunkFilePath)) {
      throw new HttpException(`Data chunk not found.`, HttpStatus.NOT_FOUND);
    }
    fs.rmSync(chunkFilePath); // TODO use async
  }

  restore(): string[] {
    return fs.readdirSync(`${this.storageDir}/data/`)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        return file.substring(0, file.indexOf('.json'));
     });
  }

  store(id: string, coded: ResponseRow[]): void {
    fs.writeFileSync(`${this.storageDir}/data/${id}.json`, JSON.stringify(coded));
  }

  getExampleCodingScheme(): AutoCodingInstructions {
    return <AutoCodingInstructions>{
      variableCodings: []
    }
  }
}
