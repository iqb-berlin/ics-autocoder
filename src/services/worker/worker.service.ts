import { Injectable } from '@nestjs/common';
import { interval, Observable } from 'rxjs';
import { ResponseRow, Task } from 'iqbspecs-coding-service/interfaces/ics-api.interfaces';
import { CodingSchemeFactory } from '@iqb/responses';
import { Response } from '@iqbspecs/response/response.interface';
import { TasksService } from '../tasks/tasks.service';
import { DataService } from '../data/data.service';
import { IdService } from '../id.service';
import { AutocoderService } from '../autocoder/autocoder.service';

@Injectable()
export class WorkerService {
  private runner: Observable<number> = interval(1000);

  constructor(
    private readonly ts: TasksService,
    private readonly ds: DataService,
    private readonly as: AutocoderService
  ) {
    this.runner
      .subscribe(async second => {
        const nextTask = this.ts.getNext();
        if (!nextTask) return;
        console.log(second, nextTask.id);
        this.code(nextTask);
      });
  }

  private code(task: Task) {
    const stripSetId = (row: ResponseRow): Response => {
      const copy: Response & { setId?: string } = { ...row };
      delete copy.setId;
      return copy;
    };
    try {
      const inputData: { [setId: string]: Response[] } = task.data
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .filter(task => task.type === 'input')
        .flatMap(chunk => this.ds.get(chunk.id))
        .reduce((agg, row: ResponseRow) => {
          if (!(row.setId in agg)) agg[row.setId] = [];
          agg[row.setId].push(stripSetId(row));
          return agg;
        }, {});

      if ((!task.instructions) || (!this.as.validateScheme(task.instructions))) {
        throw new Error('invalid task instructions');
      }
      const instructions = task.instructions.variableCodings;

      const coded = Object.entries(inputData)
        .flatMap(([setId, set]: [string, Response[]]): ResponseRow[] => CodingSchemeFactory.code(set, instructions)
          .map((response: Response): ResponseRow => ({ ...response, setId }))
        );
      const id = IdService.create();
      this.ds.store(id, coded);
      task.data.push({
        id,
        type: 'output'
      });
      task.events.push({
        message: 'Done!',
        status: 'finish',
        timestamp: Date.now()
      });
    } catch (error) {
      task.events.push({
        message: (error instanceof Error) ? error.message : 'unknown error',
        status: 'fail',
        timestamp: Date.now()
      });
      console.error(error);
    }
  }
}
