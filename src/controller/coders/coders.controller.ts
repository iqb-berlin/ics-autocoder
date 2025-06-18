import {
 Controller, Delete, Get, Param
} from '@nestjs/common';
import { Coder } from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import { TasksService } from '../../services/tasks/tasks.service';

@Controller('coders')
export class CodersController {
  constructor(
    private readonly ts: TasksService
  ) {}

  @Get('')
  get(
  ): Coder[] {
    return this.ts.listCoders();
  }

  @Delete('/:coderId')
  delete(
    @Param('coderId') coderId: string,
  ): void {
    this.ts.deleteCoder(coderId);
  }
}
