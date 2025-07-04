/* eslint-disable no-console */
import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put
} from '@nestjs/common';
import {
  DataChunk,
  ResponseRow,
  Task, TaskAction,
  TaskActions,
  TaskUpdate
} from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import { isA } from 'iqbspecs-coding-service/functions/common.typeguards';
import { isResponse } from 'iqbspecs-coding-service/functions/iqb.typeguards';
import { isTaskUpdate } from 'iqbspecs-coding-service/functions/ics-api.typeguards';
import { TasksService } from '../../services/tasks/tasks.service';
import { AutocoderService } from '../../services/autocoder/autocoder.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly ts: TasksService,
    private readonly as: AutocoderService
  ) {
  }

  @Get()
  getAll(): Task[] {
    return this.ts.getAll();
  }

  @Put()
  put(
    @Body() body: unknown
  ): Task {
    if (!isTaskUpdate(body)) throw new HttpException('Invalid or missing task-type.', HttpStatus.NOT_ACCEPTABLE);
    return this.ts.add(body);
  }

  @Get(':taskId')
  get(
    @Param('taskId') taskId: string
  ): Task {
    return this.ts.get(taskId);
  }

  @Patch('/:taskId')
  patch(
    @Param('taskId') taskId: string,
    @Body() body: TaskUpdate
  ): Task {
    if (body.instructions && !this.as.validateScheme(body.instructions)) {
      throw new HttpException('Validation of coding scheme did not work.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return this.ts.update(taskId, body);
  }

  @Post(':taskId/:action')
  post(
    @Param('taskId') taskId: string,
    @Param('action') action: string
  ): Task {
    if (!isA<TaskAction>(TaskActions, action)) throw new HttpException(`Unknown action ${action}.`, HttpStatus.NOT_ACCEPTABLE);
    return this.ts.action(taskId, action);
  }

  @Delete('/:taskId')
  delete(
    @Param('taskId') taskId: string,
  ): void {
    this.ts.delete(taskId);
  }

  @Put('/:taskId/data')
  putData(
    @Param('taskId') taskId: string,
    @Body() body: unknown // IQBVariable[]
  ): DataChunk {
    if (!TasksController.validateDataChunk(body)) return { id: 'invalid data', type: 'input' };
    return this.ts.addData(taskId, body)
  }

  @Get('/:taskId/data/:chunkId')
  getData(
    @Param('taskId') taskId: string,
    @Param('chunkId') chunkId: string
  ): ResponseRow[] {
    return this.ts.getData(taskId, chunkId);
  }

  @Delete('/:taskId/data/:chunkId')
  deleteData(
    @Param('taskId') taskId: string,
    @Param('chunkId') chunkId: string
  ): void {
    this.ts.deleteData(taskId, chunkId);
  }

  static validateDataChunk(thing: unknown): thing is ResponseRow[] {
    if (!Array.isArray(thing)) {
      throw new HttpException('Not an Array.', HttpStatus.NOT_ACCEPTABLE);
    }
    const failure = thing.findIndex(r => !isResponse(r));
    if (failure > -1) {
      console.log(thing[failure]);
      throw new HttpException(`Invalid dataset nr ${failure}.`, HttpStatus.NOT_ACCEPTABLE);
    }
    return true;
  }
}
