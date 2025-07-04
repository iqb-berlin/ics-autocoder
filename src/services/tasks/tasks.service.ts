import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Coder,
  DataChunk,
  ResponseRow,
  Task,
  TaskAction,
  TaskEventType,
  TaskUpdate
} from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import { IdService } from '../id.service';
import { DataService } from '../data/data.service';
import { AutocoderService } from '../autocoder/autocoder.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly ds: DataService,
    private readonly as: AutocoderService
  ) {
  }

  private tasks: { [ id: string] : Task } = { };

  exists(id: string): boolean {
    return typeof this.tasks[id] !== 'undefined';
  }

  getAll(): Task[] {
    return Object.values(this.tasks);
  }

  static getLastEvent(task: Task): TaskEventType {
    if (!task.events.length) {
      throw new Error('Invalid task. Task must contain at least the event of it\'s creation');
    }
    return task.events.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].status;
  }

  get(id: string): Task {
    if (!this.exists(id)) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return this.tasks[id];
  }

  getNext(): Task | undefined {
    return Object.values(this.tasks).find(task => TasksService.getLastEvent(task) === 'commit');
  }

  add(seed: TaskUpdate): Task {
    const newTask: Task = {
      id: IdService.create(),
      events: [{
        status: 'create',
        message: '',
        timestamp: Date.now()
      }],
      type: seed.type || 'unknown',
      label: seed.label || 'New Task',
      data: [],
      instructions: seed.instructions || (seed.type === 'train' ? this.as.getEmptyScheme() : undefined),
      coder: seed.coder
    };
    this.tasks[newTask.id] = newTask;
    return newTask;
  }

  action(id: string, taskAction: TaskAction): Task {
    const task = this.get(id);
    const lastEvent = TasksService.getLastEvent(task);
    // eslint-disable-next-line default-case
    switch (taskAction) {
      case 'commit':
        if (['start', 'commit'].includes(lastEvent)) {
          throw new HttpException(`Can not commit task in status is ${lastEvent}.`, HttpStatus.NOT_ACCEPTABLE);
        }
        task.events.push({
          status: 'commit',
          message: '',
          timestamp: Date.now()
        });
        break;
      case 'abort': {
        task.events.push({
          status: 'abort',
          message: '',
          timestamp: Date.now()
        });
        break;
      }
    }
    return this.tasks[id];
  }

  delete(id: string): void {
    const task = this.get(id);
    task.data.forEach(chunk => this.deleteData(id, chunk.id));
    delete this.tasks[id];
  }

  addData(taskId: string, data: ResponseRow[]): DataChunk {
    const task = this.get(taskId);
    const lastEvent = TasksService.getLastEvent(task);
    if (lastEvent !== 'create') {
      throw new HttpException(`Can not add data to ${lastEvent}ed task.`, HttpStatus.FORBIDDEN);
    }
    const chunk: DataChunk = {
      id: this.ds.add(data),
      type: 'input'
    };
    task.data.push(chunk);
    return chunk;
  }

  static hasData(task: Task, chunkId: string): boolean {
    return task.data.some(d => d.id === chunkId);
  }

  getData(taskId: string, chunkId: string): ResponseRow[] {
    const task = this.get(taskId);
    if (!TasksService.hasData(task, chunkId)) {
      throw new HttpException('Data chunk not attached to task', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.ds.get(chunkId);
  }

  deleteData(taskId: string, chunkId: string): void {
    const task = this.get(taskId);
    if (!TasksService.hasData(task, chunkId)) {
      throw new HttpException('Data chunk not attached to task', HttpStatus.NOT_ACCEPTABLE);
    }
    task.data = task.data.filter(d => d.id !== chunkId);
    this.ds.delete(chunkId);
  }

  update(taskId: string, update: TaskUpdate): Task {
    const task = this.get(taskId);
    if (update.instructions) task.instructions = update.instructions;
    if (update.label) task.label = update.label;
    if (update.type) task.type = update.type;
    if (update.coder) task.coder = update.coder;
    return task;
  }
}
