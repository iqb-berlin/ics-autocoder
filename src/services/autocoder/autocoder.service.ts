import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as codingSchemeSchema from 'specs/coding-scheme.schema.json';
import { ValidationError, Validator, ValidatorResultError } from 'jsonschema';
import {AutoCodingInstructions} from "iqbspecs-coding-service/interfaces/iqb.interfaces";


@Injectable()
export class AutocoderService {
  readonly schema = codingSchemeSchema;
  private readonly validator = new Validator();

  validateScheme(codingScheme: unknown): codingScheme is AutoCodingInstructions {
    try {
      this.validator.validate(codingScheme, this.schema, { required: true, throwAll: true });
      return true;
    } catch (e) {
      console.log(e);
      const text = (e instanceof ValidatorResultError) ?
        (e.errors as unknown as ValidationError[]).map(e => e.stack) : // circumvent buggy type definition of ValidatorResultError
        e;
      console.error(text);
      console.log(codingScheme);
      throw new HttpException('Invalid Scheme: ' + text, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  getEmptyScheme(): AutoCodingInstructions {
    const scheme = { version: '0.0', variableCodings: [] };
    if (this.validateScheme(scheme)) return scheme;
    throw new Error('Could not create empty scheme');
  }
}
